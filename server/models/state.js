const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stateSchema = new Schema({

    name: {
        type: String,
        required: [true, 'State name is required']
    },
    code: {
        type: String,
        required: [true, 'State code is required'],
        unique: true
    }

});

module.exports = mongoose.model('State', stateSchema);