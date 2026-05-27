const Request = require('../../models/request');
const BloodUnit = require('../../models/bloodUnit');
const Pledge = require('../../models/pledge');
const User = require('../../models/user');
const moment = require('moment');
const { GROUPS } = require('../../utils/compatibility');

const EXPIRY_DAYS_BY_COMPONENT = {
    whole_blood: 35,
    rbc:         42,
    plasma:      365,
    platelets:   5,
};

function bankController() {
    return {

        async dashboard(req, res) {
            const bankId = req.user.bloodBankId;
            if (!bankId) {
                req.flash('error', 'Your account is not linked to a blood bank.');
                return res.redirect('/login');
            }
            const now = new Date();
            const in48h = new Date(Date.now() + 48 * 60 * 60 * 1000);
            const startOfDay = moment().startOf('day').toDate();

            const [byGroup, totalUnits, expiringSoon, openRequests, donationsToday, recentRequests] = await Promise.all([
                BloodUnit.aggregate([
                    { $match: { bloodBankId: bankId, status: 'available' } },
                    { $group: { _id: '$bloodGroup', units: { $sum: '$units' } } },
                ]),
                BloodUnit.aggregate([
                    { $match: { bloodBankId: bankId, status: 'available' } },
                    { $group: { _id: null, total: { $sum: '$units' } } },
                ]),
                BloodUnit.countDocuments({
                    bloodBankId: bankId, status: 'available',
                    expiryDate: { $lte: in48h, $gte: now },
                }),
                Request.countDocuments({
                    bloodBankId: bankId,
                    status: { $in: ['pending', 'matched', 'assigned'] },
                }),
                Pledge.countDocuments({
                    bankId, state: 'completed',
                    updatedAt: { $gte: startOfDay },
                }),
                Request.find({ bloodBankId: bankId, status: { $in: ['pending', 'matched', 'assigned'] } })
                    .sort({ urgency: 1, createdAt: -1 })
                    .limit(6)
                    .lean(),
            ]);

            // Build a full 8-row table even if some groups have 0 units.
            const inventoryByGroup = GROUPS.map(g => {
                const row = byGroup.find(b => b._id === g);
                return { group: g, units: row ? row.units : 0 };
            });

            const todaysPledges = await Pledge.find({ bankId, state: { $in: ['waiting', 'confirmed'] } })
                .sort({ createdAt: -1 }).limit(8)
                .populate('donorId', 'name bloodGroup city phone')
                .populate('requestId', 'bloodGroup unitsNeeded urgency')
                .lean();

            res.render('bank/dashboard', {
                kpi: {
                    totalUnits: totalUnits[0]?.total || 0,
                    expiringSoon,
                    openRequests,
                    donationsToday,
                },
                inventoryByGroup,
                recentRequests,
                todaysPledges,
                moment,
            });
        },

        async inventory(req, res) {
            const bankId = req.user.bloodBankId;
            const units = await BloodUnit.find({ bloodBankId: bankId })
                .sort({ expiryDate: 1 })
                .lean();
            // Mark each row with an expiry tone
            const decorated = units.map(u => {
                const daysToExpiry = Math.ceil((u.expiryDate - Date.now()) / (1000 * 60 * 60 * 24));
                let tone = 'ok';
                if (daysToExpiry <= 2)  tone = 'critical';
                else if (daysToExpiry <= 7) tone = 'warn';
                return { ...u, daysToExpiry, tone };
            });
            res.render('bank/inventory', { units: decorated, moment, GROUPS });
        },

        async addInventory(req, res) {
            const bankId = req.user.bloodBankId;
            const { bloodGroup, component, units, collectionDate, sourceDonorName } = req.body;
            if (!bloodGroup || !component || !units || !collectionDate) {
                req.flash('error', 'All inventory fields are required');
                return res.redirect('/bank/inventory');
            }
            const collDate = new Date(collectionDate);
            const expiryDays = EXPIRY_DAYS_BY_COMPONENT[component] || 35;
            const expiryDate = new Date(collDate.getTime() + expiryDays * 24 * 60 * 60 * 1000);

            await BloodUnit.create({
                bloodBankId: bankId,
                bloodGroup,
                component,
                units: Number(units),
                collectionDate: collDate,
                expiryDate,
                sourceDonorName: sourceDonorName || 'Voluntary donor',
                status: 'available',
            });
            req.flash('success', `${units} unit(s) of ${bloodGroup} added to inventory.`);
            res.redirect('/bank/inventory');
        },

        async requests(req, res) {
            const bankId = req.user.bloodBankId;
            const tab = req.query.tab || 'pending';
            const map = {
                pending: ['pending', 'matched'],
                progress: ['assigned'],
                fulfilled: ['fulfilled'],
            };
            const filter = { bloodBankId: bankId };
            if (map[tab]) filter.status = { $in: map[tab] };

            const requests = await Request.find(filter)
                .sort({ urgency: 1, createdAt: -1 })
                .populate('requesterId', 'name phone email')
                .lean();

            // Counts for the tab bar
            const all = await Request.find({ bloodBankId: bankId }, 'status').lean();
            const counts = {
                pending:  all.filter(r => ['pending', 'matched'].includes(r.status)).length,
                progress: all.filter(r => r.status === 'assigned').length,
                fulfilled: all.filter(r => r.status === 'fulfilled').length,
            };

            // Pledge counts per request
            const pledgeAgg = await Pledge.aggregate([
                { $match: { requestId: { $in: requests.map(r => r._id) } } },
                { $group: { _id: '$requestId', count: { $sum: 1 } } },
            ]);
            const pmap = Object.fromEntries(pledgeAgg.map(p => [String(p._id), p.count]));
            const decorated = requests.map(r => ({ ...r, pledges: pmap[String(r._id)] || 0 }));

            res.render('bank/requests', { requests: decorated, counts, tab, moment });
        },

        async updateRequestStatus(req, res) {
            const { requestId, status } = req.body;
            const r = await Request.findById(requestId);
            if (!r || String(r.bloodBankId) !== String(req.user.bloodBankId)) {
                return res.redirect('/bank/requests');
            }
            r.status = status;
            const labels = {
                matched:   { tone: '#3B82F6', text: 'Bank matched the request with inventory.' },
                assigned:  { tone: '#7C3AED', text: 'Donor assigned by the bank.' },
                fulfilled: { tone: '#10B981', text: 'Request fulfilled — transfusion complete.' },
                cancelled: { tone: '#9CA3AF', text: 'Request cancelled by the bank.' },
            };
            if (labels[status]) {
                r.activity.push({ type: status, ...labels[status] });
            }
            if (status === 'fulfilled') r.unitsFulfilled = r.unitsNeeded;
            await r.save();

            const ee = req.app.get('eventEmitter');
            ee.emit('requestUpdated', { id: String(r._id), status: r.status });

            req.flash('success', `Request marked as ${status}.`);
            res.redirect('/bank/requests');
        },

        async pledges(req, res) {
            const bankId = req.user.bloodBankId;
            const filterGroup = req.query.group;
            const filter = { bankId };
            if (filterGroup) {
                // join with request to filter by recipient blood group
                // simpler: just leave it open since pledges don't carry group
            }
            const pledges = await Pledge.find(filter)
                .sort({ createdAt: -1 })
                .populate('donorId', 'name bloodGroup city phone')
                .populate('requestId', 'bloodGroup unitsNeeded urgency patientName status')
                .lean();
            res.render('bank/pledges', { pledges, moment, GROUPS });
        },

        async updatePledge(req, res) {
            const { pledgeId, state, scheduledFor } = req.body;
            const p = await Pledge.findById(pledgeId);
            if (!p || String(p.bankId) !== String(req.user.bloodBankId)) {
                return res.redirect('/bank/pledges');
            }
            p.state = state;
            if (scheduledFor) p.scheduledFor = new Date(scheduledFor);
            await p.save();
            req.flash('success', `Pledge marked as ${state}.`);
            res.redirect('/bank/pledges');
        },
    };
}

module.exports = bankController;
