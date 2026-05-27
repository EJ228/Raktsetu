const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    // ---- core (reused from pizza app) ----
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone:    { type: String, default: '' },

    // ---- role ----
    role: {
        type: String,
        enum: ['donor', 'requester', 'bank_admin'],
        required: true,
        default: 'donor',
    },

    // ---- donor-specific ----
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', null],
        default: null,
    },
    dob:    { type: Date,    default: null },
    weight: { type: Number,  default: null },
    gender: { type: String,  enum: ['male', 'female', 'other', null], default: null },
    lastDonationDate: { type: Date, default: null },
    available: { type: Boolean, default: true }, // donor available for emergency calls

    // ---- bank admin specific ----
    bloodBankId: { type: Schema.Types.ObjectId, ref: 'BloodBank', default: null },

    // ---- location (for geospatial donor matching) ----
    city: { type: String, default: '' },
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], default: [0, 0] }, // [lng, lat]
    },
}, { timestamps: true });

// Geospatial index — enables $near queries for donor proximity matching
userSchema.index({ location: '2dsphere' });

const User = mongoose.model('User', userSchema);
module.exports = User;
