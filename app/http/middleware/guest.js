function guest(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    // Send logged-in users to their dashboard, not the home page.
    var role = req.user.role;
    if (role === 'donor')      return res.redirect('/donor/dashboard');
    if (role === 'requester')  return res.redirect('/requester/my');
    if (role === 'bank_admin') return res.redirect('/bank/dashboard');
    return res.redirect('/');
}

module.exports = guest;