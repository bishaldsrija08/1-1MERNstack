const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productStockQty: {
        type: Number,
        required: true
    },
    productStatus: {
        type: String,
        enum: ["in-stock", "out-of-stock"]
    },
    productPrice: {
        type: Number,
        required: true
    },
    productImageUrl: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;