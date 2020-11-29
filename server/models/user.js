const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');


const Schema = mongoose.Schema;

const validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a valid role.'
}
const userSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Name is required']
    },
    last_name: {
        type: String,
        required: [true, 'Last name is required']
    },

    password: {
        type: String,
        required: [true, 'Password is required']
    },

    email: {
        type: String,
        required: [true, 'Password is required'],
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email not valid')
            }
        }
    },
    status: {
        type: Boolean,
        default: true
    },

    role:{
        type: String,
        required: [true, 'Role is required'],
        default: 'USER_ROLE',
        enum: validRoles
    }

});

userSchema.plugin(uniqueValidator, {message: '{PATH} already registered'});

//Here, I cannot use arrow function
userSchema.methods.getPublicFields = function(){
    
    return {
        name: this.name,
        last_name: this.last_name,
        email: this.email,
        role: this.role,
      
    }
}



module.exports = mongoose.model('User', userSchema);

