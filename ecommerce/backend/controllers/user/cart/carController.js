// Cart features goes here

const Product = require("../../../models/productModel")
const User = require("../../../models/userModel")

// addToCart
const addToCart = async (req, res) => {
    const userId = req.user._id
    const { productId } = req.params

    if (!productId) {
        return res.status(400).json({ message: "Product ID is required" })
    }

    const isProductExists = await Product.findById(productId)
    if (!isProductExists) {
        return res.status(404).json({ message: "Product not found" })
    }

    const user = await User.findById(userId)
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }

    user.cart.push(productId)
    await user.save()

    return res.status(200).json({ message: "Product added to cart successfully" })
}
// getCartItems

const getCartItems = async (req, res) => {
    const userId = req.user._id

    const user = await User.findById(userId).populate({
        path: "cart",
        select: "productName productDescription productStockQty productStatus productPrice productImageUrl"
    })
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }

    const cartItems = user.cart

    return res.status(200).json({ cartItems })
}
// removeFromCart
const removeFromCart = async (req, res) => {
    const userId = req.user._id
    const { productId } = req.params

    if (!productId) {
        return res.status(400).json({ message: "Product ID is required" })
    }

    const user = await User.findById(userId)
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }

    user.cart = user.cart.filter(item => item != productId)
    await user.save()

    return res.status(200).json({ message: "Product removed from cart successfully" })
}
// updateCartItemQuantity

const updateProductInCart = async (req, res) => {
    const userId = req.user._id
    const { productId } = req.params

    if (!productId) {
        return res.status(400).json({ message: "Product ID is required" })
    }

    const user = await User.findById(userId)
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }

    user.cart = user.cart.filter(item => item != productId)
    user.cart.push(productId)
    await user.save()

    res.status(200).json({ message: "Product updated in cart successfully" })
}

// clearCart

const clearCart = async (req, res) => {
    const userId = req.user._id

    const user = await User.findById(userId)
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }

    if (user.cart.length === 0) {
        return res.status(400).json({ message: "Cart is already empty" })
    }

    user.cart = []
    await user.save()

    return res.status(200).json({ message: "Cart cleared successfully" })
}


module.exports = {
    addToCart,
    getCartItems,
    removeFromCart,
    updateProductInCart,
    clearCart
}