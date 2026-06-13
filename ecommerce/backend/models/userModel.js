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
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);

module.exports = User;