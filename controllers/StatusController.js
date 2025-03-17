const Battery = require('../models/Battery');

exports.updateDeviceStatus = async (req, res) => {
    try {
        const { uniqueid, batteryLevel, isCharging, connectivity } = req.body;

        if (!uniqueid) {
            return res.status(400).json({ message: 'Unique ID is required' });
        }

        console.log(`Updating Device Status:
        UniqueID: ${uniqueid}, Battery: ${batteryLevel}, Charging: ${isCharging}, Connectivity: ${connectivity}`);

        // Timestamp को मैन्युअली update न करें, Mongoose auto timestamps manage करेगा
        const updatedBatteryData = await Battery.findOneAndUpdate(
            { uniqueid },
            { batteryLevel, isCharging, connectivity },
            { new: true, upsert: true }
        );

        console.log("Updated Battery Data:", updatedBatteryData);

        res.status(201).json({
            success: true,
            message: "Saved successfully",
            data: updatedBatteryData
        });
    } catch (error) {
        console.error('Error updating device status:', error);
        res.status(500).json({ message: 'Server error' });
    }
};