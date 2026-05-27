const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bloodBankSchema = new Schema({
    name:          { type: String, required: true, trim: true },
    licenseNumber: { type: String, required: true, trim: true },
    address:       { type: String, required: true },
    city:          { type: String, required: true, index: true },
    phone:         { type: String, default: '' },
    email:         { type: String, default: '' },
    coordinator:   { type: String, default: '' }, // display name shown to public
    verified:      { type: Boolean, default: false },
    openHours:     { type: String, default: '24 / 7' },
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], default: [0, 0] },
    },
}, { timestamps: true });

bloodBankSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('BloodBank', bloodBankSchema);
