const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const validVehicles = {
    values: ['Truck', 'Car', 'Motorcycle', 'Bus', 'Pickup'],
    message: '{VALUE} is not a valid vehicle.'
};
const vehicleSchema = Schema({
    type: {
        type: String,
        required: [true, 'Vehicle type is required']
    },
    amount: {
        type: Number,
        required: true,
        enum: validVehicles
    },
    status: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);