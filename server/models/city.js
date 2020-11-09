const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const citySchema = Schema({
    name: {
        type: String,
        required: [true, 'City name is required']
    },
    code: {
        type: String,
        required: [true, 'City code is required'],
        unique: true
    },
    state: {
        type: Schema.Types.ObjectId,
        ref: 'State',
        required: true
    }

});

module.exports = mongoose.model('City', citySchema)