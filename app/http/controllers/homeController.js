const User = require('../../models/user');
const BloodBank = require('../../models/bloodBank');
const BloodUnit = require('../../models/bloodUnit');
const Request = require('../../models/request');
const moment = require('moment');

function homeController() {
    return {
        async index(req, res) {
            // Live stats for the landing page.
            const [donorCount, unitsAgg, fulfilledThisMonth, urgent] = await Promise.all([
                User.countDocuments({ role: 'donor' }),
                BloodUnit.aggregate([
                    { $match: { status: 'available' } },
                    { $group: { _id: null, total: { $sum: '$units' } } },
                ]),
                Request.countDocuments({
                    status: 'fulfilled',
                    updatedAt: { $gte: moment().startOf('month').toDate() },
                }),
                Request.find({ status: { $in: ['pending', 'matched', 'assigned'] } })
                    .sort({ urgency: 1, createdAt: -1 })
                    .limit(4)
                    .populate('bloodBankId', 'name city')
                    .lean(),
            ]);

            const stats = {
                donors: donorCount.toLocaleString('en-IN'),
                units:  (unitsAgg[0]?.total || 0).toLocaleString('en-IN'),
                lives:  fulfilledThisMonth.toLocaleString('en-IN'),
            };

            res.render('home', { stats, urgent, moment });
        },

        async search(req, res) {
            const { bloodGroup, city } = req.query;
            let results = [];
            if (bloodGroup || city) {
                // Find banks; for each, compute available units of the requested group.
                const bankFilter = {};
                if (city) bankFilter.city = new RegExp(`^${city}$`, 'i');
                const banks = await BloodBank.find(bankFilter).lean();
                const bankIds = banks.map(b => b._id);

                const unitMatch = { bankId: { $in: bankIds }, status: 'available' };
                if (bloodGroup) unitMatch.bloodGroup = bloodGroup;

                const inventoryByBank = await BloodUnit.aggregate([
                    { $match: { bloodBankId: { $in: bankIds }, status: 'available', ...(bloodGroup ? { bloodGroup } : {}) } },
                    { $group: { _id: { bank: '$bloodBankId', group: '$bloodGroup' }, units: { $sum: '$units' } } },
                ]);

                const byBank = {};
                inventoryByBank.forEach(row => {
                    const key = String(row._id.bank);
                    if (!byBank[key]) byBank[key] = {};
                    byBank[key][row._id.group] = row.units;
                });

                results = banks.map(b => ({
                    ...b,
                    inventory: byBank[String(b._id)] || {},
                    totalUnits: Object.values(byBank[String(b._id)] || {}).reduce((a, c) => a + c, 0),
                }));
            }
            res.render('search', { results, query: { bloodGroup: bloodGroup || '', city: city || '' } });
        },
    };
}

module.exports = homeController;
