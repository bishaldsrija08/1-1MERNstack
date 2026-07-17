const Order = require("../../../models/orderModel")

// Only admin can access this route
const getAllOrders = async (req, res)=>{

    const orders = await Order.find().populate({
        path: "orderItems.productId",
        model: "Product"
    })

    if(!orders || orders.length === 0) {
        return res.status(404).json({message: "No orders found"});
    }

    return res.status(200).json({
        message: "Orders retrieved successfully",
        data: orders
    })
}


const updateOrderStatus = async (req, res)=>{
    const {orderId} = req.params;
    const {orderStatus} = req.body;

    if(!orderId) {
        return res.status(400).json({message: "Order ID is required"});
    }

    const existingOrder = await Order.findById(orderId);
    if(!existingOrder) {
        return res.status(404).json({message: "Order not found"});
    }

    if(!orderStatus || !["Pending", "Shipped", "Delivered", "Cancelled", "Returned", "Refunded", "On the way", "Preparing"].includes(orderStatus)) {
        return res.status(400).json({message: "Invalid order status"});
    }

    await Order.findByIdAndUpdate(orderId, { orderStatus }, { new: true });
    return res.status(200).json({ message: "Order status updated successfully" });
}

module.exports = {
    getAllOrders,
    updateOrderStatus
}