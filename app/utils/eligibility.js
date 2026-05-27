/**
 * Donor eligibility per Indian National Blood Transfusion Council norms (simplified).
 *
 *  - Whole blood donation gap: 90 days
 *  - Age: 18 - 65
 *  - Weight: >= 50 kg
 *
 * Returns { eligible, reason, daysUntilEligible, lastDonationLabel }.
 */

const MIN_GAP_DAYS = 90;
const MIN_AGE = 18;
const MAX_AGE = 65;
const MIN_WEIGHT_KG = 50;

const MS_PER_DAY = 1000 * 60 * 60 * 24;

function ageFromDob(dob) {
    if (!dob) return null;
    const now = new Date();
    let age = now.getFullYear() - dob.getFullYear();
    const m = now.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
    return age;
}

function daysSince(date) {
    if (!date) return Infinity;
    return Math.floor((Date.now() - date.getTime()) / MS_PER_DAY);
}

function checkEligibility(user) {
    if (!user || user.role !== 'donor') {
        return { eligible: false, reason: 'Not a donor account' };
    }

    const age = ageFromDob(user.dob);
    if (age !== null && (age < MIN_AGE || age > MAX_AGE)) {
        return { eligible: false, reason: `Age must be between ${MIN_AGE} and ${MAX_AGE}` };
    }
    if (user.weight && user.weight < MIN_WEIGHT_KG) {
        return { eligible: false, reason: `Minimum weight is ${MIN_WEIGHT_KG} kg` };
    }

    if (!user.lastDonationDate) {
        return {
            eligible: true,
            reason: 'First-time donor',
            daysUntilEligible: 0,
            lastDonationLabel: 'No prior donations recorded',
        };
    }

    const since = daysSince(user.lastDonationDate);
    if (since >= MIN_GAP_DAYS) {
        return {
            eligible: true,
            reason: `${since} days since your last donation`,
            daysUntilEligible: 0,
            lastDonationLabel: `${since} days since your last donation`,
        };
    }
    return {
        eligible: false,
        reason: `Next eligible in ${MIN_GAP_DAYS - since} days`,
        daysUntilEligible: MIN_GAP_DAYS - since,
        lastDonationLabel: `${since} days since your last donation`,
    };
}

module.exports = { checkEligibility, ageFromDob, MIN_GAP_DAYS, MIN_AGE, MAX_AGE, MIN_WEIGHT_KG };
