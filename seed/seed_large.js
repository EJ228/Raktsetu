require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User      = require('../app/models/user');
const BloodBank = require('../app/models/bloodBank');
const BloodUnit = require('../app/models/bloodUnit');
const Request   = require('../app/models/request');
const Pledge    = require('../app/models/pledge');

const MONGO_URL = process.env.MONGO_CONNECTION_URL || 'mongodb://localhost:27017/raktsetu';

async function seed() {
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
    
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const components = ['whole_blood', 'rbc', 'platelets', 'plasma'];
    const names = ['Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Riaan', 'Ayaan', 'Krishna', 'Ishaan', 'Shaurya', 'Atharv', 'Advik', 'Pranav', 'Kabir', 'Ritik', 'Rohan', 'Dhruv', 'Siddharth', 'Yash', 'Sanya', 'Kriti', 'Neha', 'Pooja', 'Anjali', 'Sneha', 'Shruti', 'Riya', 'Aarti', 'Kavita', 'Nisha', 'Meera', 'Anushka', 'Priya', 'Aditi', 'Nandini', 'Ishita', 'Tanvi', 'Simran', 'Roshni'];

    function randomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // ---------- 20 Blood banks ----------
    const banksData = [];
    for (let i = 1; i <= 20; i++) {
        banksData.push({
            name: `Blood Bank ${i} · Guwahati`,
            licenseNumber: `ABL-GH-${100 + i}`,
            address: `Sector ${i}, Guwahati`,
            city: 'Guwahati',
            phone: `+91 361 252 84${i.toString().padStart(2, '0')}`,
            email: `bank${i}@example.in`,
            coordinator: `Dr. Coordinator ${i}`,
            verified: Math.random() > 0.2, // 80% verified
            openHours: 'Open 24 / 7',
            location: { type: 'Point', coordinates: [91.7362 + (Math.random() - 0.5) * 0.1, 26.1445 + (Math.random() - 0.5) * 0.1] },
        });
    }
    const banks = await BloodBank.create(banksData);
    console.log(`✅ Created ${banks.length} blood banks`);

    // ---------- Bank admins ----------
    const adminsData = [];
    for (let i = 0; i < 20; i++) {
        adminsData.push({
            name: `Admin Bank ${i+1}`, email: `admin${i+1}@bank.in`, password: passwordHash,
            phone: `+91 90000 000${i.toString().padStart(2, '0')}`, role: 'bank_admin',
            bloodBankId: banks[i]._id, city: 'Guwahati',
        });
    }
    await User.insertMany(adminsData);

    // ---------- 50 Donors ----------
    const donorsData = [];
    for (let i = 1; i <= 50; i++) {
        donorsData.push({
            name: `${randomItem(names)} ${randomItem(['Sharma', 'Singh', 'Das', 'Patel', 'Bhattacharya', 'Menon', 'Gupta', 'Verma'])}`,
            email: `donor${i}@example.com`, password: passwordHash,
            phone: `+91 98000 100${i.toString().padStart(2, '0')}`, role: 'donor',
            bloodGroup: randomItem(bloodGroups), gender: Math.random() > 0.5 ? 'male' : 'female', weight: 55 + Math.floor(Math.random() * 30),
            dob: new Date(now - (18 + Math.floor(Math.random() * 30)) * 365 * day), city: 'Guwahati',
            lastDonationDate: Math.random() > 0.5 ? new Date(now - Math.floor(Math.random() * 200) * day) : null,
            available: true,
            location: { type: 'Point', coordinates: [91.7362 + (Math.random() - 0.5) * 0.1, 26.1445 + (Math.random() - 0.5) * 0.1] },
        });
    }
    const donors = await User.create(donorsData);
    console.log(`✅ Created ${donors.length} donors`);

    // ---------- 10 Requesters ----------
    const requestersData = [];
    for (let i = 1; i <= 10; i++) {
        requestersData.push({
            name: `Requester ${i}`, email: `requester${i}@example.com`, password: passwordHash,
            phone: `+91 98000 200${i.toString().padStart(2, '0')}`, role: 'requester', city: 'Guwahati',
        });
    }
    const requesters = await User.create(requestersData);
    console.log(`✅ Created ${requesters.length} requesters`);

    // ---------- ~200 Inventory Items ----------
    const inv = [];
    banks.forEach((bank) => {
        bloodGroups.forEach(g => {
            const baseUnits = Math.floor(Math.random() * 8); // 0 to 7 units per group
            for (let i = 0; i < baseUnits; i++) {
                const collDate = new Date(now - Math.floor(Math.random() * 28) * day);
                inv.push({
                    bloodBankId: bank._id,
                    bloodGroup: g,
                    component: randomItem(components),
                    units: 1,
                    collectionDate: collDate,
                    expiryDate: new Date(collDate.getTime() + 35 * day),
                    sourceDonorName: 'Voluntary donor',
                    status: 'available',
                });
            }
        });
    });
    await BloodUnit.insertMany(inv);
    console.log(`✅ Inserted ${inv.length} blood units`);

    // ---------- 30 Requests ----------
    const requestsData = [];
    for (let i = 1; i <= 30; i++) {
        const rBank = randomItem(banks);
        const rRequester = randomItem(requesters);
        const neededBy = new Date(now + Math.floor(Math.random() * 5 * day) - 1 * day); // Some past, some future
        
        requestsData.push({
            requesterId: rRequester._id,
            bloodBankId: rBank._id,
            patientName: `${randomItem(names)} (Patient)`, patientAge: 10 + Math.floor(Math.random() * 60), patientGender: Math.random() > 0.5 ? 'male' : 'female',
            condition: randomItem(['Surgery', 'Accident', 'Thalassaemia', 'Dengue', 'Anemia']),
            bloodGroup: randomItem(bloodGroups), component: randomItem(components),
            unitsNeeded: 1 + Math.floor(Math.random() * 4), 
            unitsFulfilled: Math.floor(Math.random() * 2),
            neededBy: neededBy,
            urgency: randomItem(['normal', 'urgent', 'critical']),
            status: randomItem(['pending', 'matched', 'fulfilled']),
            phone: rRequester.phone, city: 'Guwahati',
            activity: [
                { when: new Date(now - 60 * 60 * 1000), type: 'created', tone: '#C8232C', text: 'Request created.' }
            ],
        });
    }
    const requests = await Request.create(requestsData);
    console.log(`✅ Created ${requests.length} requests`);

    // ---------- 50 Pledges ----------
    const pledgesData = [];
    for (let i = 0; i < 50; i++) {
        const rRequest = randomItem(requests);
        const rDonor = randomItem(donors);
        pledgesData.push({
            donorId: rDonor._id,
            requestId: rRequest._id, 
            bankId: rRequest.bloodBankId,
            state: randomItem(['waiting', 'confirmed', 'completed', 'declined']),
            distanceKm: (Math.random() * 10).toFixed(1), 
            etaMinutes: Math.floor(Math.random() * 60),
        });
    }
    await Pledge.insertMany(pledgesData);
    console.log(`✅ Created ${pledgesData.length} pledges`);

    // ---------- Force create some specific accounts for easy testing ----------
    const specificAdmin = await User.create({
        name: 'Dr. Test Admin', email: 'rashmi@gmc.in', password: passwordHash,
        phone: '+91 361 252 8417', role: 'bank_admin',
        bloodBankId: banks[0]._id, city: 'Guwahati',
    });
    
    const specificDonor = await User.create({
        name: 'Rohan Donor', email: 'rohan@example.com', password: passwordHash,
        phone: '+91 90091 22334', role: 'donor',
        bloodGroup: 'O+', gender: 'male', weight: 78,
        dob: new Date('1992-01-25'), city: 'Guwahati',
        lastDonationDate: null,
        available: true,
    });
    
    const specificRequester = await User.create({
        name: 'Rahul Requester', email: 'rahul@example.com', password: passwordHash,
        phone: '+91 98000 00000', role: 'requester', city: 'Guwahati',
    });

    console.log('\n────────────────────────────────────');
    console.log('🩸 RaktSetu MASS SEED complete.');
    console.log('────────────────────────────────────');
    console.log('Demo credentials (password: password123):');
    console.log('  Donor      → rohan@example.com');
    console.log('  Requester  → rahul@example.com');
    console.log('  Bank admin → rashmi@gmc.in');
    console.log('────────────────────────────────────\n');

    await mongoose.disconnect();
    process.exit(0);
}

seed().catch(err => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
});
