
const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: [3, "Username should be between 3 and 20 characters"],
        maxlength: [20, "Username should be between 3 and 20 characters"],
        trim: true,
        validate: [validator.isAlphanumeric, 'Username can contain only alphanumeric characters']
        
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        validate: [validator.isEmail, 'Email is invalid']
        
    },

    password: {
        type: String,
        required: [true, 'Password is required']
    },

    active: {
        type: Boolean,
        default: false
    },
    
    createdAt: {
        type: Date,
        default: Date.now()
    },

    activationToken: {
        type: String
    },

    passwordResetToken: {
        type: String
    },

    passwordResetExpires: {
        type: Date
    }

});
    



module.exports = mongoose.model('User', userSchema);