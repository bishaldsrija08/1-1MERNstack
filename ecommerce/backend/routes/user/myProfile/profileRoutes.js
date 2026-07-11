const { getMyProfile, deleteMyProfile, updateMyProfile, updateMyPassword } = require('../../../controllers/user/myProfile/profileController');
const checkRole = require('../../../middleware/checkRole');
const isAuthenticated = require('../../../middleware/isAuthenticated');
const catchAsync = require('../../../services/catchAsync');

const router = require('express').Router();




router.route("/my-profile").get(isAuthenticated,checkRole("customer", "seller"), catchAsync(getMyProfile))
router.route("/my-profile").delete(isAuthenticated, checkRole("customer", "seller"), catchAsync(deleteMyProfile)).patch(isAuthenticated, checkRole("customer", "seller"), catchAsync(updateMyProfile))
router.route("/my-profile/update-password").patch(isAuthenticated, checkRole("customer", "seller"), catchAsync(updateMyPassword))




module.exports = router