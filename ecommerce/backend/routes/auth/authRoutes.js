const { registerUser, loginUser, forgotPassword } = require('../../controllers/auth/authController');

const router = require('express').Router();
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgot-password").post(forgotPassword)











module.exports = router