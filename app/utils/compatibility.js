/**
 * Blood-group compatibility matrix.
 *
 * Rows = donor group, columns = recipient group.
 * Universal donor: O- (can give to everyone).
 * Universal recipient: AB+ (can receive from everyone).
 * Rh-positive donors cannot give to Rh-negative recipients.
 */

const GROUPS = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

const COMPAT_MATRIX = {
    'O-':  ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    'O+':  ['O+', 'A+', 'B+', 'AB+'],
    'A-':  ['A-', 'A+', 'AB-', 'AB+'],
    'A+':  ['A+', 'AB+'],
    'B-':  ['B-', 'B+', 'AB-', 'AB+'],
    'B+':  ['B+', 'AB+'],
    'AB-': ['AB-', 'AB+'],
    'AB+': ['AB+'],
};

/** Can a donor of `donor` group give to a recipient of `recipient` group? */
function canDonate(donor, recipient) {
    if (!COMPAT_MATRIX[donor]) return false;
    return COMPAT_MATRIX[donor].includes(recipient);
}

/** Return every donor group that can supply blood for `recipient`. */
function donorsThatCanSupply(recipient) {
    return GROUPS.filter(g => canDonate(g, recipient));
}

/** Return every recipient group that `donor` can give to. */
function recipientsForDonor(donor) {
    return COMPAT_MATRIX[donor] || [];
}

/** Short human-readable note for the UI badge. */
function donorTagline(group) {
    if (group === 'O-')  return 'Universal donor';
    if (group === 'AB+') return 'Universal plasma donor';
    if (group === 'O+')  return 'Universal Rh+ donor';
    return `Compatible with ${recipientsForDonor(group).length} groups`;
}

module.exports = {
    GROUPS,
    COMPAT_MATRIX,
    canDonate,
    donorsThatCanSupply,
    recipientsForDonor,
    donorTagline,
};
