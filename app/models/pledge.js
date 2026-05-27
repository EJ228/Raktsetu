const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pledgeSchema = new Schema({
    donorId:   { type: Schema.Types.ObjectId, ref: 'User',    required: true, index: true },
    requestId: { type: Schema.Types.ObjectId, ref: 'Request', required: true, index: true },
    bankId:    { type: Schema.Types.ObjectId, ref: 'BloodBank', required: true, index: true },

    state: {
        type: String,
        enum: ['waiting', 'confirmed', 'scheduled', 'completed', 'declined'],
        default: 'waiting',
        index: true,
    },

    distanceKm: { type: Number, default: 0 },
    etaMinutes: { type: Number, default: 0 },
    scheduledFor: { type: Date, default: null },
    note: { type: String, default: '' },
}, { timestamps: true });

pledgeSchema.index({ donorId: 1, requestId: 1 }, { unique: true });

module.exports = mongoose.model('Pledge', pledgeSchema);
