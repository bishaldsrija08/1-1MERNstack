const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    userPhoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer'
    },
    otp: {
        type: Number,
        default: null
    }
}, {
    timestamps: true
})

const User = mongoose.model('user', userSchema);

module.exports = User;