require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoStore = require('connect-mongo');
const expressLayout = require('express-ejs-layouts');
const passport = require('passport');
const Emitter = require('events');

const initRoutes = require('./routes/web.js');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Database ----------
mongoose.connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => console.log('✅ Database connected'));
connection.on('error', (err) => console.error('❌ Connection failed:', err));

// ---------- Session store ----------
const mongoStore = new MongoStore({
    mongoUrl: process.env.MONGO_CONNECTION_URL,
    collection: 'sessions',
});

// ---------- Event emitter (drives realtime updates) ----------
const eventEmitter = new Emitter();
app.set('eventEmitter', eventEmitter);

// ---------- Session config ----------
app.use(session({
    secret: process.env.COOKIE_SECRET || 'change-me-in-env',
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
}));
app.use(flash());

// ---------- Passport ----------
const passportInit = require('./app/config/passport.js');
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// ---------- Templating ----------
app.use(expressLayout);
const viewsDir = path.join(__dirname, '/resources/views');
app.set('views', viewsDir);
app.set('view engine', 'ejs');
// Allow include('partials/...') to resolve from the views root, even in subdirectory templates.
app.set('view options', { root: viewsDir });

// ---------- Static & body parsing ----------
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Expose session, user and path to every view
app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.user;
    res.locals.currentPath = req.path;
    next();
});

// ---------- Routes ----------
initRoutes(app);

// ---------- 404 ----------
app.use((req, res) => {
    res.status(404).render('errors/404');
});

// ---------- Server ----------
const server = app.listen(PORT, () => {
    console.log(`🩸 RaktSetu listening on port ${PORT}`);
});

// ---------- Socket.io ----------
const { Server } = require('socket.io');
const io = new Server(server);

io.on('connection', (socket) => {
    socket.on('join', (room) => {
        socket.join(room);
    });
});

// Realtime channels
// 1. Requester listens on `request_<id>` for status updates
eventEmitter.on('requestUpdated', (data) => {
    io.to(`request_${data.id}`).emit('requestUpdated', data);
});
// 2. Compatible donors listen on `donors_<bloodGroup>_<city>` for new urgent requests
eventEmitter.on('urgentRequest', (data) => {
    (data.notifyChannels || []).forEach((channel) => {
        io.to(channel).emit('urgentRequest', data);
    });
});
// 3. Bank admins listen on `bank_<bankId>` for new requests / pledges
eventEmitter.on('bankNotification', (data) => {
    io.to(`bank_${data.bankId}`).emit('bankNotification', data);
});
