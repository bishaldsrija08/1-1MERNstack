const { getAllReviews } = require("../../../controllers/admin/review/reviewController");
const checkRole = require("../../../middleware/checkRole");
const isAuthenticated = require("../../../middleware/isAuthenticated");
const catchAsync = require("../../../services/catchAsync");

const router = require("express").Router();

router.route("/").get(isAuthenticated, checkRole("seller"), catchAsync(getAllReviews));

module.exports = router;
