const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bloodUnitSchema = new Schema({
    bloodBankId: { type: Schema.Types.ObjectId, ref: 'BloodBank', required: true, index: true },

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

    units:          { type: Number, default: 1 }, // qty held in this record
    collectionDate: { type: Date, required: true },
    expiryDate:     { type: Date, required: true, index: true },

    sourceDonorId:  { type: Schema.Types.ObjectId, ref: 'User', default: null },
    sourceDonorName:{ type: String, default: '' }, // denormalised for display

    status: {
        type: String,
        enum: ['available', 'reserved', 'used', 'expired'],
        default: 'available',
        index: true,
    },
    reservedForRequest: { type: Schema.Types.ObjectId, ref: 'Request', default: null },
}, { timestamps: true });

module.exports = mongoose.model('BloodUnit', bloodUnitSchema);
