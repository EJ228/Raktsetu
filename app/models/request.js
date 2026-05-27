const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestSchema = new Schema({
    requesterId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    bloodBankId: { type: Schema.Types.ObjectId, ref: 'BloodBank', required: true, index: true },

    // ---- patient info ----
    patientName:      { type: String, required: true },
    patientAge:       { type: Number, required: true },
    patientGender:    { type: String, enum: ['male', 'female', 'other'], default: 'other' },
    condition:        { type: String, default: '' },

    // ---- blood need ----
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: true,
        index: true,
    },
    component: {
        type: String,
        enum: ['whole_blood', 'rbc', 'plasma', 'platelets'],
        default: 'whole_blood',
    },
    unitsNeeded:    { type: Number, required: true, min: 1 },
    unitsFulfilled: { type: Number, default: 0 },
    neededBy:       { type: Date, required: true },

    urgency: {
        type: String,
        enum: ['normal', 'urgent', 'critical'],
        default: 'normal',
        index: true,
    },

    // ---- status flow (mirrors pizza order pattern for Socket.io) ----
    status: {
        type: String,
        enum: ['pending', 'matched', 'assigned', 'fulfilled', 'cancelled'],
        default: 'pending',
        index: true,
    },

    // ---- contact ----
    phone:   { type: String, required: true },
    address: { type: String, default: '' },
    city:    { type: String, required: true, index: true },

    // ---- activity log (append-only, surfaces in the timeline UI) ----
    activity: [{
        when:  { type: Date, default: Date.now },
        type:  { type: String, enum: ['created', 'escalated', 'pledged', 'reserved', 'assigned', 'fulfilled', 'cancelled', 'note'] },
        tone:  { type: String, default: '#1A1A1A' },
        text:  { type: String, required: true },
    }],
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
