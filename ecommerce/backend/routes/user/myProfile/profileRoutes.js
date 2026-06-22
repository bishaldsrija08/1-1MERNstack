const { getMyProfile, deleteMyProfile, updateMyProfile, updateMyPassword } = require('../../../controllers/user/myProfile/profileController');

const router = require('express').Router();




router.route("/my-profile/:id").get(getMyProfile)
router.route("/my-profile/:id").delete(deleteMyProfile).patch(updateMyProfile)
router.route("/my-profile/update-password/:id").patch(updateMyPassword)




module.exports = router