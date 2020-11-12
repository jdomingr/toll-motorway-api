const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const passThroughBoth = new Schema({

    date: {
        type: Date,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },

    toll_both: {
        type: Schema.Types.ObjectId,
        ref: 'TollBoth',
        required: [true, 'Toll Both is required']
    },

    vehicle: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: [true, 'Vehicle is required']
    }

});

module.exports = mongoose.model('PassThroughBoth', passThroughBoth);