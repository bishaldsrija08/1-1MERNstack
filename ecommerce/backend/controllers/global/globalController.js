const Product = require("../../models/productModel");
const Order = require("../../models/orderModel");

// get all products (supports search, status filter, price range and pagination)
const getAllProducts = async (req, res) => {
    const { search, status, minPrice, maxPrice, page = 1, limit = 12 } = req.query;

    const filter = {};

    if (search && search.trim()) {
        // escape regex special characters so user input can't break the pattern
        const safeSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const searchRegex = new RegExp(safeSearch, "i");
        filter.$or = [{ productName: searchRegex }, { productDescription: searchRegex }];
    }

    if (status && ["in-stock", "out-of-stock"].includes(status)) {
        filter.productStatus = status;
    }

    if (minPrice || maxPrice) {
        filter.productPrice = {};
        if (minPrice && !Number.isNaN(Number(minPrice))) filter.productPrice.$gte = Number(minPrice);
        if (maxPrice && !Number.isNaN(Number(maxPrice))) filter.productPrice.$lte = Number(maxPrice);
    }

    const pageNumber = Math.max(1, Number(page) || 1);
    const pageSize = Math.min(100, Math.max(1, Number(limit) || 12));

    const [products, total] = await Promise.all([
        Product.find(filter)
            .sort({ createdAt: -1 })
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize),
        Product.countDocuments(filter),
    ]);

    return res.status(200).json({
        message: "Products fetched successfully",
        data: products,
        pagination: {
            total,
            page: pageNumber,
            limit: pageSize,
            totalPages: Math.ceil(total / pageSize) || 1,
        },
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
        path: "orderItems.productId",
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