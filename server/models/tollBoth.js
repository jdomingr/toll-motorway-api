const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TollBothSchema = new Schema({

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

    toll_road: {
        type: Schema.Types.ObjectId,
        ref: 'TollRoad',
        required: [true, 'Toll Road is required']
    }

});

module.exports = mongoose.model('TollBoth', TollBothSchema);