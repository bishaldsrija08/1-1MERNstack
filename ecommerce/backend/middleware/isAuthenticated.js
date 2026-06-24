const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware to check if the user is authenticated
const isAuthenticated = async(req, res, next) => {
    try {
        const token = req.headers.authorization
        if (!token) {
            return res.status(401).json({
                message: "No token provided, authorization denied"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json({
                message: "Token is not valid"
            })
        }

        const userId = decoded.userId
        const isUserExists = await User.findById(userId)
        if (!isUserExists) {
            return res.status(401).json({
                message: "User not found, authorization denied"
            })
        }

        req.user = isUserExists
        next()
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            message: "Server error"
        })
    }
}

module.exports = isAuthenticated