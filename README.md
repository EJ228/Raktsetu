# 🩸 RaktSetu — real-time blood donor coordination

RaktSetu (Sanskrit for "blood bridge") is a real-time platform that connects **blood donors**, **patients** who need blood, and **blood banks** in India. It uses live matching, blood-group compatibility logic, and instant donor notifications to shorten the gap between a need and a donation.



## ✨ Highlights

- **Three roles, one platform**: Donors, Requesters (patients/families), and Blood Bank Admins each get a tailored dashboard and permission boundary.
- **Real-time updates via Socket.io**: Requesters watch their request progress live. Donors get instant alerts for compatible urgent needs in their city. Bank admins see pledges roll in.
- **Blood-group compatibility matrix**: Every request is matched only against medically compatible donors / inventory. O− is universal donor; AB+ is universal recipient. The logic lives in [`app/utils/compatibility.js`](app/utils/compatibility.js).
- **Geospatial donor lookup**: `User` and `BloodBank` both have a `2dsphere` geospatial index, ready for `$near` queries that sort donor matches by distance.
- **Eligibility engine**: 90-day cooldown between whole-blood donations, age 18–65, minimum weight 50 kg — surfaces an "eligible today" or countdown status on the donor dashboard. ([`app/utils/eligibility.js`](app/utils/eligibility.js))
- **Expiry-aware inventory**: Blood units carry collection + expiry dates; bank dashboards highlight units expiring within 48 hours so they're used first.
- **10-screen React design prototype** (see `/design`): the UI was first designed as an interactive React + Tailwind prototype, then ported to production EJS templates.

---

## 🧱 Stack

| Layer        | Tech                                              |
|--------------|---------------------------------------------------|
| Server       | Node.js, Express                                  |
| Database     | MongoDB (Mongoose), with `2dsphere` indexes       |
| Auth         | Passport.js (local strategy) + bcrypt + sessions  |
| Realtime     | Socket.io (`requestUpdated`, `urgentRequest`, `bankNotification`) |
| Templating   | EJS + `express-ejs-layouts`                       |
| Styling      | Tailwind CSS (via CDN), custom design tokens      |
| Design       | React + Tailwind prototype in `/design`           |
| Session store| `connect-mongo`                                   |

---

## 🚀 Run it locally

**1. Install deps**

```bash
npm install
```

**2. Set up environment**

```bash
cp .env.example .env
# then edit .env and set MONGO_CONNECTION_URL + COOKIE_SECRET
```

You need MongoDB running locally (`brew install mongodb-community` on macOS, or use Docker), or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster.

**3. Seed demo data**

```bash
npm run seed
```

This creates 3 blood banks, 5 donors, 1 requester, 2 bank admins, ~100 inventory units (some near expiry), and 2 active requests with pledges — enough to demo the full flow.

**4. Start the server**

```bash
npm run dev      # with nodemon
# or
npm start
```

Then open <http://localhost:3000>.

## 🗺 Project structure

```
raktsetu/
├── index.js                     # Express + Socket.io bootstrap
├── package.json
├── .env.example
│
├── app/
│   ├── config/
│   │   └── passport.js          # Reused from the original codebase
│   ├── http/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── homeController.js
│   │   │   ├── donorController.js
│   │   │   ├── requesterController.js
│   │   │   └── bankController.js
│   │   └── middleware/
│   │       ├── auth.js          # Reused
│   │       ├── guest.js         # Reused
│   │       └── role.js          # Role-based access factory
│   ├── models/
│   │   ├── user.js              # Three-role user (donor / requester / bank_admin)
│   │   ├── bloodBank.js
│   │   ├── bloodUnit.js
│   │   ├── request.js           # Patient request with activity log
│   │   └── pledge.js            # Donor offer against a specific request
│   └── utils/
│       ├── compatibility.js     # Blood-group matrix + helpers
│       └── eligibility.js       # Donor eligibility rules
│
├── routes/
│   └── web.js                   # All public + role-protected routes
│
├── resources/
│   └── views/
│       ├── layout.ejs
│       ├── home.ejs             # Public landing
│       ├── search.ejs           # Public blood-availability search
│       ├── auth/
│       ├── donor/
│       ├── requester/
│       ├── bank/
│       ├── notifications.ejs
│       ├── errors/
│       └── partials/            # Reusable UI primitives: logo, icon, badges, KPI card, appShell, …
│
├── public/
│   ├── css/app.css              # Design tokens, animations, primary button
│   ├── js/app.js                # Socket.io client + small interactivity
│   └── favicon.ico
│
├── seed/
│   └── seed.js                  # `npm run seed`
│
└── design/                      # React + Tailwind design prototype (10 screens)
    ├── RaktSetu.html
    ├── ui.jsx
    ├── ui-shell.jsx
    ├── app.jsx
    └── screen-*.jsx
```

---

## 🔁 Real-time channels

The `eventEmitter` pattern (kept from the original codebase) bridges Express controllers to Socket.io rooms. Three live channels:

| Event                | Room joined by              | Triggered when                              |
|----------------------|-----------------------------|---------------------------------------------|
| `requestUpdated`     | `request_<id>`              | Bank or requester changes the request status |
| `urgentRequest`      | `donors_<group>_<city>`     | A new critical/urgent request is created    |
| `bankNotification`   | `bank_<bankId>`             | A new request or pledge hits the bank       |

---

## 🩺 Status flow

```
pending  →  matched  →  assigned  →  fulfilled
                                  ↘
                                   cancelled
```

Every transition appends to the request's `activity` log, which is what the requester's live timeline reads from.

---

## 🎨 Design

The UI was first designed as an interactive React + Tailwind prototype (10 screens) and then ported to EJS. The prototype lives in `/design/RaktSetu.html` and renders standalone — open it in a browser to flip between screens and toggle desktop/mobile viewports.

The production EJS templates reuse the same color palette, typography (Inter), component vocabulary (blood-group badge, urgency badge, KPI card, status timeline) and CSS animations (`rs-pulse`, `rs-ping`, `rs-float`).

---
Insteresting Features

- The **real-time matching pattern**: the `eventEmitter` → Socket.io rooms abstraction lets controllers stay HTTP-shaped while still pushing live updates.
- The **compatibility matrix**: small algorithmic piece that takes a recipient group and returns the set of donor groups that can supply it, used both to filter the donor's feed and at request-creation time.
- The **role middleware factory**: a single `role(['donor', 'bank_admin'])` higher-order middleware replaces the original admin-only check, cleanly supporting three roles.
- The **expiry-aware inventory**: each unit carries a component-specific expiry (whole blood 35d, RBC 42d, platelets 5d, plasma 365d); the bank dashboard surfaces units about to expire.
- The **port from a delivery app**: the original real-time order-status tracking pattern mapped directly onto blood-request status updates, with no rewriting of the live-update infrastructure.

---

## 📜 License

MIT.
