const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const validVehicles = {
    values: ['Truck', 'Car', 'Motorcycle', 'Bus', 'Pickup'],
    message: '{VALUE} is not a valid vehicle.'
};
const vehicleSchema = Schema({
    type: {
        type: String,

        required: true
    },
    amount: {
        type: Number,
        required: true,
        enum: validVehicles
    }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);