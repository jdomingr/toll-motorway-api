const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TollRoadSchema = new Schema({

    name: {
        type: String,
        required: [true, 'name is required']
    },

    code: {
        type: String,
        required: [true, 'Code is required']
    },

    status: {
        type: Boolean,
        default: true
    },

    city: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        required: [true, 'City is required']
    }

});

module.exports = mongoose.model('TollRoad', TollRoadSchema);