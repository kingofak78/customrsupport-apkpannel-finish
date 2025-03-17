const mongoose = require('mongoose');

const BatterySchema = new mongoose.Schema({
    uniqueid: { type: String, required: true },
    batteryLevel: { type: Number, required: true },
    isCharging: { type: Boolean, required: true },
    connectivity: { type: String, enum: ["Online", "Offline"], required: true }
}, { timestamps: true }); // सही option timestamps: true

module.exports = mongoose.model('Battery', BatterySchema);
