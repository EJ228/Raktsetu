const authController = require('../app/http/controllers/authController');
const homeController = require('../app/http/controllers/homeController');
const donorController = require('../app/http/controllers/donorController');
const requesterController = require('../app/http/controllers/requesterController');
const bankController = require('../app/http/controllers/bankController');

const auth  = require('../app/http/middleware/auth');
const guest = require('../app/http/middleware/guest');
const role  = require('../app/http/middleware/role');

function initRoutes(app) {

    // ---------- Public ----------
    app.get('/',         homeController().index);
    app.get('/search',   homeController().search);

    // ---------- Auth ----------
    app.get ('/login',    guest, authController().login);
    app.post('/login',    authController().postLogin);
    app.get ('/register', guest, authController().register);
    app.post('/register', authController().postRegister);
    app.post('/logout',   authController().logout);

    // ---------- Donor ----------
    app.get ('/donor/dashboard',     role('donor'), donorController().dashboard);
    app.get ('/donor/profile',       role('donor'), donorController().profile);
    app.post('/donor/profile',       role('donor'), donorController().updateProfile);
    app.get ('/donor/requests/:id',  role('donor'), donorController().showRequest);
    app.post('/donor/requests/:id/pledge', role('donor'), donorController().pledge);

    // ---------- Requester ----------
    app.get ('/requester/new',           role('requester'), requesterController().newRequest);
    app.post('/requester/new',           role('requester'), requesterController().createRequest);
    app.get ('/requester/my',            role('requester'), requesterController().myRequests);
    app.get ('/requester/requests/:id',  role('requester'), requesterController().showRequest);
    app.post('/requester/requests/:id/cancel', role('requester'), requesterController().cancelRequest);

    // ---------- Bank admin ----------
    app.get ('/bank/dashboard',         role('bank_admin'), bankController().dashboard);
    app.get ('/bank/inventory',         role('bank_admin'), bankController().inventory);
    app.post('/bank/inventory/add',     role('bank_admin'), bankController().addInventory);
    app.get ('/bank/requests',          role('bank_admin'), bankController().requests);
    app.post('/bank/requests/status',   role('bank_admin'), bankController().updateRequestStatus);
    app.get ('/bank/pledges',           role('bank_admin'), bankController().pledges);
    app.post('/bank/pledges/update',    role('bank_admin'), bankController().updatePledge);

    // ---------- Notifications (any authenticated role) ----------
    app.get('/notifications', auth, (req, res) => res.render('notifications'));
    // Test routes for error pages
    app.get('/test-500', (req, res) => res.render('errors/500'));
}

module.exports = initRoutes;
