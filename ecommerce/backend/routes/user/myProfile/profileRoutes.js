const { getMyProfile, deleteMyProfile, updateMyProfile, updateMyPassword } = require('../../../controllers/user/myProfile/profileController');
const checkRole = require('../../../middleware/checkRole');
const isAuthenticated = require('../../../middleware/isAuthenticated');

const router = require('express').Router();




router.route("/my-profile").get(isAuthenticated,checkRole("customer", "seller"), getMyProfile)
router.route("/my-profile").delete(isAuthenticated, checkRole("customer", "seller"),deleteMyProfile).patch(isAuthenticated, checkRole("customer", "seller"), updateMyProfile)
router.route("/my-profile/update-password").patch(isAuthenticated, checkRole("customer", "seller"), updateMyPassword)




module.exports = router