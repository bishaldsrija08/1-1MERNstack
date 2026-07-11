const { registerUser, loginUser, forgotPassword, verifyOtp, resetPassword } = require('../../controllers/auth/authController');
const catchAsync = require('../../services/catchAsync');

const router = require('express').Router();
router.route("/register").post(catchAsync(registerUser))
router.route("/login").post(catchAsync(loginUser))
router.route("/forgot-password").post(catchAsync(forgotPassword))
router.route("/verify-otp").post(catchAsync(verifyOtp))
router.route("/reset-password").post(catchAsync(resetPassword))











module.exports = router