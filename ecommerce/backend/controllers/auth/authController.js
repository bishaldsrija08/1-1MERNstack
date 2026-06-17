const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const sendEmail = require("../../services/sendEmal");
const jwt = require("jsonwebtoken");

// Regiser User

/*
1. Accept form data
2. Validate form data
3. Check if user already exists
4. Hash the password
5. Create a new user in the database
6. Send a response to the client
*/

const registerUser = async (req, res) => {
    const { userEmail, userPhoneNumber, userName, userPassword } = req.body;
    if (!userEmail || !userPhoneNumber || !userName || !userPassword) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    const existingUser = await User.findOne({
        userEmail
    })

    if (existingUser) {
        return res.status(400).json({
            message: "User already exists! Try login instead"
        })
    }

    await User.create({
        userEmail,
        userPhoneNumber,
        userName,
        userPassword: await bcrypt.hash(userPassword, 10)
    })

    sendEmail({
        userEmail,
        subject: "Welcome to our E-commerce Platform",
        text: `Hi ${userName},\n\nThank you for registering on our e-commerce platform. We're excited to have you on board! If you have any questions or need assistance, feel free to reach out to our support team.\n\nBest regards,\nE-commerce Team`
    })

    return res.status(201).json({
        message: "User registered successfully"
    })
}

// Login User

/*
1. Accept form data
2. Validate form data
3. Check if user exists
4. Compare the password with the hashed password in the database
5. Send a response to the client
*/
const loginUser = async (req, res) => {
    const { userEmail, userPassword } = req.body;

    if (!userEmail || !userPassword) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    const existingUser = await User.findOne({ // Object from the database
        userEmail
    })

    if (!existingUser) {
        return res.status(400).json({
            message: "User not found! Try registering instead"
        })
    }

    const isPasswordValid = await bcrypt.compare(userPassword, existingUser.userPassword);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid password or email"
        })
    }

    // JWT token generation logic can be implemented here
    const token = jwt.sign({
        userId: existingUser._id
    }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })

    return res.status(200).json({
        message: "Login successful",
        token: token // In a real application, you would generate a JWT token here  
    })
}

// Forgot Password and Send OTP

/*
1. Accept email from the client
2. Validate email
3. Check if user exists
4. Generate OTP and save it in the database
5. Send OTP to the user's email
6. Send a response to the client
*/

const forgotPassword = async (req, res) => {
    const { userEmail } = req.body;
    if (!userEmail) {
        return res.status(400).json({
            message: "Email is required"
        })
    }
    const existingUser = await User.findOne({ // Object from the database
        userEmail
    })

    if (!existingUser) {
        return res.status(400).json({
            message: "User not found! Try registering instead"
        })
    }

    // Generate OTP and send it to the user's email
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
    existingUser.otp = otp;
    await existingUser.save();

    const options = {
        userEmail,
        subject: "Your OTP for Password Reset",
        text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`,
        html: `<h1>Your OTP for password reset is <b>${otp}</b>. It is valid for 10 minutes.</h1>`
    }
    await sendEmail(options);

    return res.status(200).json({
        message: "OTP sent to email"
    })
}

// Verify OTP

const verifyOtp = async (req, res) => {
    const { userEmail, otp } = req.body;
    if (!userEmail || !otp) {
        return res.status(400).json({
            message: "Email and OTP are required"
        })
    }

    const existingUser = await User.findOne({ // Object from the database
        userEmail
    })

    if (!existingUser) {
        return res.status(400).json({
            message: "User not found! Try registering instead"
        })
    }
    const isOtpValid = existingUser.otp === otp;
    if (!isOtpValid) {
        return res.status(400).json({
            message: "Invalid OTP"
        })
    }

    // OTP expiry logic can be implemented here
    // OTP expiry time is 2 minutes
    const otpExpiryTime = 2 * 60 * 1000; // 2 minutes in milliseconds
    const currentTime = Date.now();
    const otpGeneratedTime = existingUser.updatedAt.getTime();
    const diff = currentTime - otpGeneratedTime;
    if (diff > otpExpiryTime) {
        existingUser.otp = null; // Clear the OTP after expiry
        await existingUser.save();

        return res.status(400).json({
            message: "OTP expired! Please generate a new one"
        })
    }

    existingUser.isOtpVerified = true; // Mark OTP as verified
    existingUser.otp = null; // Clear the OTP after successful verification
    await existingUser.save();

    // OTP is valid, allow the user to reset the password
    return res.status(200).json({
        message: "OTP verified successfully"
    })
}

// Reset Password
const resetPassword = async (req, res) => {
    const { userEmail, newPassword, confirmPassword } = req.body;
    if (!userEmail || !newPassword || !confirmPassword) {
        return res.status(400).json({
            message: "Email and new password are required"
        })
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({
            message: "New password and confirm password do not match"
        })
    }
    const existingUser = await User.findOne({ // Object from the database
        userEmail
    })

    if (!existingUser) {
        return res.status(400).json({
            message: "User not found! Try registering instead"
        })
    }

    if (!existingUser.isOtpVerified) {
        return res.status(400).json({
            message: "OTP not verified! Please verify OTP before resetting password"
        })
    }

    // User must change password within 10 minutes of OTP verification
    const otpVerificationTime = existingUser.updatedAt.getTime();
    const currentTime = Date.now();
    const diff = currentTime - otpVerificationTime;
    const passwordResetExpiryTime = 10 * 60 * 1000; // 10 minutes in milliseconds
    if (diff > passwordResetExpiryTime) {
        existingUser.isOtpVerified = false; // Reset OTP verification status after expiry
        await existingUser.save();

        return res.status(400).json({
            message: "Password reset time expired! Please generate a new OTP"
        })
    }

    existingUser.userPassword = await bcrypt.hash(newPassword, 10);
    existingUser.isOtpVerified = false;
    await existingUser.save();

    return res.status(200).json({
        message: "Password reset successful"
    })
}

// Logout User

module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    verifyOtp,
    resetPassword
}