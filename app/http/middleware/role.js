/**
 * Role-based access middleware factory.
 * Usage:  app.get('/donor/...', role('donor'), handler)
 *         app.get('/admin/...', role(['bank_admin']), handler)
 */
function role(allowed) {
    const allowedRoles = Array.isArray(allowed) ? allowed : [allowed];
    return (req, res, next) => {
        if (!req.isAuthenticated()) {
            req.flash('error', 'Please sign in to continue');
            return res.redirect('/login');
        }
        if (!allowedRoles.includes(req.user.role)) {
            req.flash('error', "You don't have access to that page");
            return res.redirect('/');
        }
        return next();
    };
}

module.exports = role;
