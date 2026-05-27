const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const BloodBank = require('../../models/bloodBank');

function authController() {

    // Post-login redirect by role.
    const _redirectFor = (user) => {
        if (user.role === 'donor')      return '/donor/dashboard';
        if (user.role === 'requester')  return '/requester/my';
        if (user.role === 'bank_admin') return '/bank/dashboard';
        return '/';
    };

    return {
        login(req, res) {
            res.render('auth/login');
        },

        postLogin(req, res, next) {
            passport.authenticate('local', (err, user, info) => {
                if (err) return next(err);
                if (!user) {
                    req.flash('error', info && info.message ? info.message : 'Login failed');
                    return res.redirect('/login');
                }
                req.logIn(user, (loginErr) => {
                    if (loginErr) return next(loginErr);
                    return res.redirect(_redirectFor(user));
                });
            })(req, res, next);
        },

        register(req, res) {
            res.render('auth/register', { selectedRole: req.query.role || '' });
        },

        async postRegister(req, res) {
            const {
                role, name, email, password, phone,
                // donor fields
                bloodGroup, dob, gender, weight, city,
                // bank fields
                bankName, licenseNumber, address, bankCity,
            } = req.body;

            const allowedRoles = ['donor', 'requester', 'bank_admin'];
            if (!allowedRoles.includes(role)) {
                req.flash('error', 'Please choose a valid role');
                return res.redirect('/register');
            }
            if (!name || !email || !password) {
                req.flash('error', 'Name, email and password are required');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect(`/register?role=${role}`);
            }

            try {
                const exists = await User.exists({ email: email.toLowerCase() });
                if (exists) {
                    req.flash('error', 'An account with this email already exists');
                    req.flash('name', name);
                    req.flash('email', email);
                    return res.redirect(`/register?role=${role}`);
                }

                const hashed = await bcrypt.hash(password, 10);
                const userDoc = {
                    name, email: email.toLowerCase(), password: hashed, phone: phone || '', role,
                };

                if (role === 'donor') {
                    Object.assign(userDoc, {
                        bloodGroup: bloodGroup || null,
                        dob: dob ? new Date(dob) : null,
                        gender: gender || null,
                        weight: weight ? Number(weight) : null,
                        city: city || '',
                    });
                }

                if (role === 'requester') {
                    Object.assign(userDoc, { city: city || '' });
                }

                if (role === 'bank_admin') {
                    if (!bankName || !licenseNumber || !address || !bankCity) {
                        req.flash('error', 'All blood bank fields are required');
                        return res.redirect(`/register?role=${role}`);
                    }
                    const bank = await BloodBank.create({
                        name: bankName,
                        licenseNumber,
                        address,
                        city: bankCity,
                        phone: phone || '',
                        email: email.toLowerCase(),
                        coordinator: name,
                        verified: false,
                    });
                    userDoc.bloodBankId = bank._id;
                    userDoc.city = bankCity;
                }

                const user = await User.create(userDoc);
                req.logIn(user, (err) => {
                    if (err) {
                        req.flash('success', 'Account created — please sign in.');
                        return res.redirect('/login');
                    }
                    return res.redirect(_redirectFor(user));
                });
            } catch (err) {
                console.error('Registration error:', err);
                req.flash('error', 'Something went wrong. Please try again.');
                return res.redirect('/register');
            }
        },

        logout(req, res, next) {
            req.logout((err) => {
                if (err) return next(err);
                return res.redirect('/login');
            });
        },
    };
}

module.exports = authController;
