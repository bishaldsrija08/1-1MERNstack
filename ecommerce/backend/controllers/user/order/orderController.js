const Order = require("../../../models/orderModel");
const Product = require("../../../models/productModel");

const createOrder = async (req, res) => {
    const userId = req.user._id;
    const { orderItems, totalAmount, shippingAddress, paymentDetails } = req.body;

    if (!orderItems || orderItems.length === 0 || !totalAmount || !shippingAddress || !paymentDetails) {
        return res.status(400).json({ message: "Order items are required" });
    }

    const existingProducts = await Product.find({ _id: { $in: orderItems.map(item => item.productId) } });

    if (existingProducts.length !== orderItems.length) {
        return res.status(400).json({ message: "One or more products in the order do not exist" });
    }

    const order = await Order.create({
        userId,
        orderItems,
        totalAmount,
        shippingAddress,
        paymentDetails
    })

    return res.status(201).json({ message: "Order created successfully", data: order });
}

module.exports = createOrder