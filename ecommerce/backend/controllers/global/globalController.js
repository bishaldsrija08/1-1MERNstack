const Product = require("../../models/productModel");

// get all products
const getAllProducts = async (req, res) => {
    const products = await Product.find();
    return res.status(200).json({
        message: "Products fetched successfully",
        data: products
    });
}



// get single product
const getSingleProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({
        message: "Product fetched successfully",
        data: product
    });
}

// Get all orders for a user
const getAllOrders = async (req, res) => {
    const userId = req.user._id;
    const orders = await Order.find({
        userId: userId
    }).populate({
        path: orderItems.productId,
        model: "Product"
    })

    if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "No orders found" });
    }

    return res.status(200).json({ data: orders });
}

module.exports = {
    getAllProducts,
    getSingleProduct,
    getAllOrders
}