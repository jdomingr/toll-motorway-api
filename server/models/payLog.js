const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const payLog = new Schema({

    date: {
        type: Date,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },

    toll_booth: {
        type: Schema.Types.ObjectId,
        ref: 'TollBooth',
        required: [true, 'Toll Booth is required']
    },

    vehicle: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: [true, 'Vehicle is required']
    },

    status: {
        type: Boolean,
        default: true
    }

});

module.exports = mongoose.model('PayLog', payLog);