/**
 * Seed script — populates the database with demo data.
 * Run with:  npm run seed
 *
 * It is idempotent: existing data is cleared before re-seeding.
 * Demo credentials are printed at the end.
 */
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User      = require('../app/models/user');
const BloodBank = require('../app/models/bloodBank');
const BloodUnit = require('../app/models/bloodUnit');
const Request   = require('../app/models/request');
const Pledge    = require('../app/models/pledge');

const MONGO_URL = process.env.MONGO_CONNECTION_URL;

async function seed() {
    if (!MONGO_URL) {
        console.error('❌ MONGO_CONNECTION_URL is missing — copy .env.example to .env first.');
        process.exit(1);
    }
    await mongoose.connect(MONGO_URL);
    console.log('✅ Connected. Wiping existing data…');

    await Promise.all([
        User.deleteMany({}),
        BloodBank.deleteMany({}),
        BloodUnit.deleteMany({}),
        Request.deleteMany({}),
        Pledge.deleteMany({}),
    ]);

    const passwordHash = await bcrypt.hash('password123', 10);
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;

    // ---------- Blood banks ----------
    const banks = await BloodBank.create([
        {
            name: 'GMC Blood Bank',
            licenseNumber: 'ABL-GH-001',
            address: 'Old GMCH Road, Bhangagarh',
            city: 'Guwahati',
            phone: '+91 361 252 8417',
            email: 'gmc@example.in',
            coordinator: 'Dr. Rashmi Sharma',
            verified: true,
            openHours: 'Open 24 / 7',
            location: { type: 'Point', coordinates: [91.7362, 26.1445] },
        },
        {
            name: 'Apollo Hospitals Blood Centre',
            licenseNumber: 'ABL-GH-002',
            address: 'Christian Basti, GS Road',
            city: 'Guwahati',
            phone: '+91 361 712 3000',
            email: 'apollo@example.in',
            coordinator: 'Apollo Bank Admin',
            verified: true,
            openHours: 'Open 24 / 7',
            location: { type: 'Point', coordinates: [91.7589, 26.1591] },
        },
        {
            name: 'Red Cross Society — Guwahati',
            licenseNumber: 'ABL-GH-003',
            address: 'AT Road, Pan Bazaar',
            city: 'Guwahati',
            phone: '+91 361 254 0244',
            email: 'redcross@example.in',
            coordinator: 'Red Cross Coordinator',
            verified: true,
            openHours: '9 AM – 9 PM',
            location: { type: 'Point', coordinates: [91.7458, 26.1830] },
        },
    ]);
    console.log(`✅ Created ${banks.length} blood banks`);

    // ---------- Bank admins ----------
    await User.create([
        {
            name: 'Dr. Rashmi Sharma', email: 'rashmi@gmc.in', password: passwordHash,
            phone: '+91 361 252 8417', role: 'bank_admin',
            bloodBankId: banks[0]._id, city: 'Guwahati',
        },
        {
            name: 'Apollo Bank Admin', email: 'admin@apollo.in', password: passwordHash,
            phone: '+91 361 712 3000', role: 'bank_admin',
            bloodBankId: banks[1]._id, city: 'Guwahati',
        },
    ]);

    // ---------- Donors ----------
    const donors = await User.create([
        {
            name: 'Anushka Bhattacharya', email: 'anushka@example.com', password: passwordHash,
            phone: '+91 98765 43210', role: 'donor',
            bloodGroup: 'O+', gender: 'female', weight: 58,
            dob: new Date('2000-03-12'), city: 'Guwahati',
            lastDonationDate: new Date(now - 94 * day),
            available: true,
            location: { type: 'Point', coordinates: [91.7362, 26.1445] },
        },
        {
            name: 'Vikram Singh', email: 'vikram@example.com', password: passwordHash,
            phone: '+91 98123 11122', role: 'donor',
            bloodGroup: 'O-', gender: 'male', weight: 72,
            dob: new Date('1995-07-18'), city: 'Guwahati',
            lastDonationDate: new Date(now - 110 * day),
            available: true,
            location: { type: 'Point', coordinates: [91.7400, 26.1450] },
        },
        {
            name: 'Priya Menon', email: 'priya@example.com', password: passwordHash,
            phone: '+91 99887 65432', role: 'donor',
            bloodGroup: 'A+', gender: 'female', weight: 55,
            dob: new Date('1998-11-04'), city: 'Guwahati',
            lastDonationDate: new Date(now - 200 * day),
            available: true,
            location: { type: 'Point', coordinates: [91.7300, 26.1500] },
        },
        {
            name: 'Rohan Das', email: 'rohan@example.com', password: passwordHash,
            phone: '+91 90091 22334', role: 'donor',
            bloodGroup: 'O+', gender: 'male', weight: 78,
            dob: new Date('1992-01-25'), city: 'Guwahati',
            lastDonationDate: null,
            available: true,
            location: { type: 'Point', coordinates: [91.7500, 26.1300] },
        },
        {
            name: 'Sneha Patel', email: 'sneha@example.com', password: passwordHash,
            phone: '+91 91234 56789', role: 'donor',
            bloodGroup: 'B+', gender: 'female', weight: 60,
            dob: new Date('1997-09-09'), city: 'Guwahati',
            lastDonationDate: new Date(now - 30 * day), // on cooldown
            available: true,
            location: { type: 'Point', coordinates: [91.7600, 26.1400] },
        },
    ]);
    console.log(`✅ Created ${donors.length} donors`);

    // ---------- Requester ----------
    const requester = await User.create({
        name: 'Rohit Sharma', email: 'rohit@example.com', password: passwordHash,
        phone: '+91 98000 00000', role: 'requester', city: 'Guwahati',
    });

    // ---------- Inventory ----------
    const inv = [];
    const groups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    banks.forEach((bank, bi) => {
        groups.forEach(g => {
            // varying stock per bank and group
            const baseUnits = [4, 1, 3, 0, 1, 0, 5, 1][groups.indexOf(g)] + bi;
            for (let i = 0; i < baseUnits; i++) {
                const collDate = new Date(now - Math.floor(Math.random() * 28) * day);
                inv.push({
                    bloodBankId: bank._id,
                    bloodGroup: g,
                    component: 'whole_blood',
                    units: 1,
                    collectionDate: collDate,
                    expiryDate: new Date(collDate.getTime() + 35 * day),
                    sourceDonorName: 'Voluntary donor',
                    status: 'available',
                });
            }
        });
        // a few near-expiry units to make the warnings light up
        inv.push({
            bloodBankId: bank._id, bloodGroup: 'O+', component: 'platelets', units: 1,
            collectionDate: new Date(now - 4 * day),
            expiryDate: new Date(now + 1 * day),
            sourceDonorName: 'Voluntary donor',
            status: 'available',
        });
    });
    await BloodUnit.insertMany(inv);
    console.log(`✅ Inserted ${inv.length} blood units`);

    // ---------- Requests ----------
    const reqA = await Request.create({
        requesterId: requester._id,
        bloodBankId: banks[0]._id,
        patientName: 'Ayesha', patientAge: 42, patientGender: 'female',
        condition: 'Emergency cardiac surgery',
        bloodGroup: 'A+', component: 'whole_blood',
        unitsNeeded: 2, unitsFulfilled: 1,
        neededBy: new Date(now + 5 * 60 * 60 * 1000),
        urgency: 'critical', status: 'matched',
        phone: '+91 98000 00000', city: 'Guwahati',
        activity: [
            { when: new Date(now - 60 * 60 * 1000), type: 'created',   tone: '#C8232C', text: 'Request created with GMC Blood Bank.' },
            { when: new Date(now - 44 * 60 * 1000), type: 'escalated', tone: '#F59E0B', text: 'Request escalated to Critical · 28 donors pinged within 5 km.' },
            { when: new Date(now - 32 * 60 * 1000), type: 'reserved',  tone: '#3B82F6', text: 'GMC Blood Bank reserved 1 unit of A+ from on-hand inventory.' },
            { when: new Date(now - 23 * 60 * 1000), type: 'pledged',   tone: '#7C3AED', text: 'Priya Menon (A+) pledged from 2.1 km away.' },
            { when: new Date(now - 12 * 60 * 1000), type: 'assigned',  tone: '#10B981', text: 'GMC Blood Bank confirmed Vikram Singh (O-) for unit 1.' },
        ],
    });

    const reqB = await Request.create({
        requesterId: requester._id,
        bloodBankId: banks[1]._id,
        patientName: 'Meera', patientAge: 28, patientGender: 'female',
        condition: 'Thalassaemia · monthly transfusion',
        bloodGroup: 'O+', component: 'whole_blood',
        unitsNeeded: 1, unitsFulfilled: 0,
        neededBy: new Date(now + 2 * day),
        urgency: 'urgent', status: 'pending',
        phone: '+91 98000 00000', city: 'Guwahati',
        activity: [
            { when: new Date(now - 32 * 60 * 1000), type: 'created', tone: '#C8232C', text: 'Request created with Apollo Hospitals.' },
        ],
    });

    console.log('✅ Created 2 requests');

    // ---------- Pledges ----------
    await Pledge.create([
        {
            donorId: donors[1]._id, // Vikram (O-)
            requestId: reqA._id, bankId: banks[0]._id,
            state: 'confirmed', distanceKm: 0.8, etaMinutes: 12,
        },
        {
            donorId: donors[2]._id, // Priya (A+)
            requestId: reqA._id, bankId: banks[0]._id,
            state: 'confirmed', distanceKm: 2.1, etaMinutes: 18,
        },
        {
            donorId: donors[3]._id, // Rohan (O+)
            requestId: reqA._id, bankId: banks[0]._id,
            state: 'waiting', distanceKm: 3.4, etaMinutes: 24,
        },
    ]);

    console.log('✅ Created 3 pledges');

    console.log('\n────────────────────────────────────');
    console.log('🩸 RaktSetu seed complete.');
    console.log('────────────────────────────────────');
    console.log('Demo credentials (password: password123):');
    console.log('  Donor      → anushka@example.com');
    console.log('  Donor      → vikram@example.com');
    console.log('  Requester  → rohit@example.com');
    console.log('  Bank admin → rashmi@gmc.in    (GMC Blood Bank)');
    console.log('  Bank admin → admin@apollo.in  (Apollo Blood Centre)');
    console.log('────────────────────────────────────\n');

    await mongoose.disconnect();
    process.exit(0);
}

seed().catch(err => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
});
