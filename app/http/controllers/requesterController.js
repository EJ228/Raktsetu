const Request = require('../../models/request');
const BloodBank = require('../../models/bloodBank');
const Pledge = require('../../models/pledge');
const moment = require('moment');

function requesterController() {
    return {

        // GET — show "create request" multi-step form. Banks list is needed for the dropdown.
        async newRequest(req, res) {
            const banks = await BloodBank.find({}).sort({ city: 1, name: 1 }).lean();
            res.render('requester/createRequest', { banks });
        },

        // POST — save the request.
        async createRequest(req, res) {
            const {
                patientName, patientAge, patientGender, condition,
                bloodGroup, component, unitsNeeded, neededBy,
                bloodBankId, urgency, phone, address, city,
            } = req.body;

            if (!patientName || !bloodGroup || !unitsNeeded || !bloodBankId || !phone || !neededBy) {
                req.flash('error', 'Please fill all required fields.');
                return res.redirect('/requester/new');
            }

            const r = await Request.create({
                requesterId: req.user._id,
                bloodBankId,
                patientName,
                patientAge: Number(patientAge) || 0,
                patientGender: patientGender || 'other',
                condition: condition || '',
                bloodGroup,
                component: component || 'whole_blood',
                unitsNeeded: Number(unitsNeeded),
                neededBy: new Date(neededBy),
                urgency: urgency || 'normal',
                phone,
                address: address || '',
                city: city || req.user.city || '',
                status: 'pending',
                activity: [{
                    type: 'created',
                    tone: '#C8232C',
                    text: `Request created · ${unitsNeeded} unit(s) of ${bloodGroup} needed.`,
                }],
            });

            // Realtime: notify the bank and ping compatible donors in the city
            const ee = req.app.get('eventEmitter');
            ee.emit('bankNotification', { bankId: String(bloodBankId), kind: 'new_request', requestId: String(r._id) });
            if (urgency === 'critical' || urgency === 'urgent') {
                ee.emit('urgentRequest', {
                    requestId: String(r._id),
                    notifyChannels: [`donors_${bloodGroup}_${city || req.user.city || 'any'}`],
                });
            }

            req.flash('success', 'Your request is live. Compatible donors are being notified.');
            res.redirect(`/requester/requests/${r._id}`);
        },

        // List requester's requests with tab counts.
        async myRequests(req, res) {
            const tab = req.query.tab || 'all';
            const filter = { requesterId: req.user._id };
            if (tab === 'active')    filter.status = { $in: ['pending', 'matched', 'assigned'] };
            if (tab === 'fulfilled') filter.status = 'fulfilled';
            if (tab === 'cancelled') filter.status = 'cancelled';

            const [requests, counts] = await Promise.all([
                Request.find(filter)
                    .sort({ createdAt: -1 })
                    .populate('bloodBankId', 'name city')
                    .lean(),
                (async () => {
                    const all = await Request.find({ requesterId: req.user._id }, 'status').lean();
                    return {
                        all: all.length,
                        active: all.filter(r => ['pending', 'matched', 'assigned'].includes(r.status)).length,
                        fulfilled: all.filter(r => r.status === 'fulfilled').length,
                        cancelled: all.filter(r => r.status === 'cancelled').length,
                    };
                })(),
            ]);

            // Pledge counts per request (for the progress card)
            const pledgesByRequest = await Pledge.aggregate([
                { $match: { requestId: { $in: requests.map(r => r._id) } } },
                { $group: { _id: '$requestId', count: { $sum: 1 } } },
            ]);
            const pledgeMap = Object.fromEntries(pledgesByRequest.map(p => [String(p._id), p.count]));
            const decorated = requests.map(r => ({ ...r, pledges: pledgeMap[String(r._id)] || 0 }));

            res.render('requester/myRequests', { requests: decorated, counts, tab, moment });
        },

        // Single request — used by the requester's live tracking page.
        async showRequest(req, res) {
            const r = await Request.findById(req.params.id)
                .populate('bloodBankId')
                .lean();
            if (!r) return res.redirect('/requester/my');
            if (String(r.requesterId) !== String(req.user._id)) {
                return res.redirect('/requester/my');
            }
            const pledges = await Pledge.find({ requestId: r._id })
                .sort({ createdAt: -1 })
                .populate('donorId', 'name bloodGroup city')
                .lean();
            res.header('Cache-Control', 'no-store');
            res.render('requester/singleRequest', { r, pledges, moment });
        },

        async cancelRequest(req, res) {
            const r = await Request.findById(req.params.id);
            if (!r) return res.redirect('/requester/my');
            if (String(r.requesterId) !== String(req.user._id)) {
                return res.redirect('/requester/my');
            }
            r.status = 'cancelled';
            r.activity.push({ type: 'cancelled', tone: '#9CA3AF', text: 'Request cancelled by the requester.' });
            await r.save();

            const ee = req.app.get('eventEmitter');
            ee.emit('requestUpdated', { id: String(r._id), status: r.status });

            req.flash('success', 'Request cancelled.');
            res.redirect(`/requester/requests/${r._id}`);
        },
    };
}

module.exports = requesterController;
