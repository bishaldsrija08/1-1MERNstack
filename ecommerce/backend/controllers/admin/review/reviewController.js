const Review = require("../../../models/reviewModel");

// Get all reviews for all products
const getAllReviews = async (req, res) => {
    const reviews = await Review.find()
        .populate("userId", "userName")
        .populate("productId", "productName productImageUrl");

    if (!reviews || reviews.length === 0) {
        return res.status(404).json({ message: "No reviews found" });
    }

    return res.status(200).json({
        message: "Reviews retrieved successfully",
        data: reviews
    });
}

module.exports = {
    getAllReviews
}
