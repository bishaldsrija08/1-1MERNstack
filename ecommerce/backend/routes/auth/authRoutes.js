const { registerUser, loginUser, forgotPassword, verifyOtp, resetPassword } = require('../../controllers/auth/authController');

const router = require('express').Router();
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgot-password").post(forgotPassword)
router.route("/verify-otp").post(verifyOtp)
router.route("/reset-password").post(resetPassword)











module.exports = router