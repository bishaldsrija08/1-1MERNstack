const { getMyProfile, deleteMyProfile, updateMyProfile, updateMyPassword } = require('../../../controllers/user/myProfile/profileController');
const isAuthenticated = require('../../../middleware/isAuthenticated');

const router = require('express').Router();




router.route("/my-profile").get(isAuthenticated, getMyProfile)
router.route("/my-profile").delete(isAuthenticated, deleteMyProfile).patch(isAuthenticated, updateMyProfile)
router.route("/my-profile/update-password").patch(isAuthenticated, updateMyPassword)




module.exports = router