const Product = require("../../../models/productModel");
const Review = require("../../../models/reviewModel");

// Create review
const createReview = async (req, res) => {
    const userId = req.user._id;
    const productId = req.params.id;

    const { rating, message } = req.body;

    const productExists = await Product.findById(productId);
    if (!productExists) {
        return res.status(404).json({ message: "Product not found" });
    }

    await Review.create({
        userId,
        productId,
        rating,
        message
    })

    res.status(201).json({ message: "Review created successfully" });
}
// Get all reviews for a product
const getAllProductReviews = async (req, res) => {
    const productId = req.params.id;
    const productExists = await Product.findById(productId);
    if (!productExists) {
        return res.status(404).json({ message: "Product not found" });
    }
    // dont fetch unnecessary data
    const reviews = await Review.find({ productId }).populate("userId").populate("productId");
    if (reviews.length === 0) {
        return res.status(404).json({ message: "No reviews found for this product" });
    }
    res.status(200).json({ data: reviews });
}

// Get my reviews
const getMyReview = async (req, res) => {
    const usrId = req.user._id;

    const review = await Review.find({ userId: usrId })
        .populate("userId")
        .populate("productId");

    if (!review.length) {
        return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ data: review });
};

// Delete a review
const deleteReview = async (req, res) => {
    const userId = req.user._id; // Get the user ID from the authenticated user
    const reviewId = req.params.id;

    const review = await Review.findById(reviewId);
    if (!review) {
        return res.status(404).json({ message: "Review not found" });
    }
    const ownerId = review.userId // Get the owner ID of the review
    // console.log(userId.toString()==ownerId.toString())
    // console.log(userId, ownerId)
    if (userId.toString() != ownerId.toString()) {
        return res.status(403).json({ message: "You are not authorized to delete this review" });
    }

    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({ message: "Review deleted successfully" });

}

module.exports = {
    createReview,
    getAllProductReviews,
    getMyReview,
    deleteReview
}