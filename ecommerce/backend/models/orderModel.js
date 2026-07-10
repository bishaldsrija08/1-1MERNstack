const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderItems: [{
        quantity: {
            type: Number,
            required: true
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ["Pending", "Shipped", "Delivered", "Cancelled", "Returned", "Refunded", "On the way", "Preparing"],
        default: "Pending"
    },
    paymentDetails: {
        method: {
            type: String,
            enum: ["Khalti", "Cash on Delivery"],
            default: "Cash on Delivery",
            required: true
        },
        paymentStatus: {
            type: String,
            enum: ["Paid", "Unpaid"],
            default: "Unpaid"
        }
    }
}, {
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;