// backend/db.js
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://paytm:vijayshekhar@cluster0.zwxq1c5.mongodb.net/new")

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },pin: {
        type: String,
        required: true,
        maxLength: 4,
        validate: {
            validator: function(value) {
                return /^\d{4}$/.test(value);
            },
            message: 'PIN must be exactly 4 digits'
        }
    },
    
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
	User,
    Account
};