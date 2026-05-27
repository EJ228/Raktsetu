const User = require('../../models/user');
const Request = require('../../models/request');
const Pledge = require('../../models/pledge');
const BloodBank = require('../../models/bloodBank');
const { checkEligibility } = require('../../utils/eligibility');
const { donorsThatCanSupply, canDonate, donorTagline } = require('../../utils/compatibility');
const moment = require('moment');

function donorController() {
    return {
        async dashboard(req, res) {
            const user = req.user;
            const eligibility = checkEligibility(user);

            // Pull urgent requests in the donor's city whose required group can be supplied
            // by this donor's blood group.
            let urgent = [];
            if (user.bloodGroup) {
                const supplies = donorsThatCanSupply; // helper
                // requests where THIS donor's group can supply the recipient's group:
                const compatRecipients = require('../../utils/compatibility').recipientsForDonor(user.bloodGroup);
                urgent = await Request.find({
                    city: user.city || /.*/, // soft city filter
                    status: { $in: ['pending', 'matched'] },
                    bloodGroup: { $in: compatRecipients },
                })
                .sort({ urgency: 1, createdAt: -1 })
                .limit(8)
                .populate('bloodBankId', 'name city address')
                .lean();
            }

            // Donor's own pledge history → donations made
            const pledges = await Pledge.find({ donorId: user._id, state: 'completed' })
                .sort({ updatedAt: -1 }).limit(8)
                .populate({ path: 'bankId', select: 'name city' })
                .lean();

            res.render('donor/dashboard', {
                eligibility,
                urgent,
                pledges,
                tagline: user.bloodGroup ? donorTagline(user.bloodGroup) : '',
                moment,
            });
        },

        async profile(req, res) {
            const moment = require('moment');
            res.render('donor/profile', { moment });
        },

        async updateProfile(req, res) {
            const { name, phone, city, bloodGroup, dob, weight, gender, available } = req.body;
            await User.updateOne({ _id: req.user._id }, {
                ...(name && { name }),
                ...(phone && { phone }),
                ...(city && { city }),
                ...(bloodGroup && { bloodGroup }),
                ...(dob && { dob: new Date(dob) }),
                ...(weight && { weight: Number(weight) }),
                ...(gender && { gender }),
                available: available === 'on' || available === 'true',
            });
            req.flash('success', 'Profile updated');
            res.redirect('/donor/profile');
        },

        async showRequest(req, res) {
            const r = await Request.findById(req.params.id)
                .populate('bloodBankId')
                .lean();
            if (!r) return res.redirect('/donor/dashboard');

            // Compatibility for this donor → this recipient
            const compatible = req.user.bloodGroup && canDonate(req.user.bloodGroup, r.bloodGroup);

            // Already pledged?
            const myPledge = await Pledge.findOne({ donorId: req.user._id, requestId: r._id }).lean();

            // Other donors who pledged (count + sample list)
            const otherPledges = await Pledge.find({ requestId: r._id })
                .sort({ createdAt: -1 }).limit(5)
                .populate('donorId', 'name bloodGroup city')
                .lean();

            res.render('donor/requestDetail', {
                r, compatible, myPledge, otherPledges, moment,
            });
        },

        async pledge(req, res) {
            const r = await Request.findById(req.params.id);
            if (!r) return res.redirect('/donor/dashboard');

            // Idempotent — one pledge per donor per request
            await Pledge.updateOne(
                { donorId: req.user._id, requestId: r._id },
                {
                    $setOnInsert: {
                        donorId: req.user._id,
                        requestId: r._id,
                        bankId: r.bloodBankId,
                        state: 'waiting',
                        distanceKm: 0,
                        etaMinutes: 0,
                    },
                },
                { upsert: true }
            );

            // Push to activity feed
            r.activity.push({
                type: 'pledged',
                tone: '#7C3AED',
                text: `${req.user.name} (${req.user.bloodGroup}) pledged to donate.`,
            });
            if (r.status === 'pending') r.status = 'matched';
            await r.save();

            // Emit realtime updates
            const ee = req.app.get('eventEmitter');
            ee.emit('requestUpdated', { id: String(r._id), status: r.status });
            ee.emit('bankNotification', { bankId: String(r.bloodBankId), kind: 'pledge', requestId: String(r._id) });

            req.flash('success', 'Thank you — the blood bank has been notified.');
            res.redirect(`/donor/requests/${r._id}`);
        },
    };
}

module.exports = donorController;
