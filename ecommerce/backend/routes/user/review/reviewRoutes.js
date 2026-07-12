const { createReview, getAllProductReviews, getMyReview, deleteReview } = require("../../../controllers/user/review/reviewController");
const checkRole = require("../../../middleware/checkRole");
const isAuthenticated = require("../../../middleware/isAuthenticated");
const catchAsync = require("../../../services/catchAsync");

const router = require("express").Router();

router.route("/create/:id").post(isAuthenticated, checkRole("customer"), catchAsync(createReview))
router.route("/all-reviews/:id").get(isAuthenticated, checkRole("customer", "seller"), catchAsync(getAllProductReviews))
router.route("/delete/:id").delete(isAuthenticated, checkRole("customer"), catchAsync(deleteReview));
router.route("/myreview").get(isAuthenticated, checkRole("customer"), catchAsync(getMyReview));









module.exports = router;