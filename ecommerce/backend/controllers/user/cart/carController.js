// Cart features goes here

const Product = require("../../../models/productModel")
const User = require("../../../models/userModel")

// Helper function to extract product ID from cart item (handles both object and legacy ObjectId)
const getProductId = (item) => {
    if (!item) return null
    if (item.product) {
        return item.product._id ? item.product._id.toString() : item.product.toString()
    }
    return item._id ? item._id.toString() : item.toString()
}

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

    const cartItemIndex = user.cart.findIndex(item => getProductId(item) === productId)

    if (cartItemIndex > -1) {
        if (typeof user.cart[cartItemIndex] === 'object' && user.cart[cartItemIndex].product) {
            user.cart[cartItemIndex].quantity = (user.cart[cartItemIndex].quantity || 1) + 1
        } else {
            user.cart[cartItemIndex] = { product: productId, quantity: 2 }
        }
    } else {
        user.cart.push({ product: productId, quantity: 1 })
    }

    await user.save()

    const updatedUser = await User.findById(userId).populate({
        path: "cart.product",
        select: "productName productDescription productStockQty productStatus productPrice productImageUrl"
    })

    const cartItems = []
    for (let item of updatedUser.cart) {
        if (item && item.product && item.product.productName) {
            cartItems.push({
                _id: item._id,
                quantity: item.quantity || 1,
                product: item.product
            })
        }
    }

    return res.status(200).json({ message: "Product added to cart successfully", cartItems })
}

// getCartItems
const getCartItems = async (req, res) => {
    const userId = req.user._id

    const user = await User.findById(userId).populate({
        path: "cart.product",
        select: "productName productDescription productStockQty productStatus productPrice productImageUrl"
    })

    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }

    const validDbCart = []
    const cartItems = []

    for (let item of user.cart) {
        if (item && item.product && item.product.productName) {
            validDbCart.push({
                product: item.product._id,
                quantity: item.quantity || 1
            })
            cartItems.push({
                _id: item._id,
                quantity: item.quantity || 1,
                product: item.product
            })
        }
    }

    // Auto-clean database if null/deleted product references existed
    if (validDbCart.length !== user.cart.length) {
        user.cart = validDbCart
        await user.save()
    }

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

    user.cart = user.cart.filter(item => getProductId(item) !== productId)
    await user.save()

    return res.status(200).json({ message: "Product removed from cart successfully" })
}

// updateCartItemQuantity
const updateProductInCart = async (req, res) => {
    const userId = req.user._id
    const { productId } = req.params
    const { quantity } = req.body

    if (!productId) {
        return res.status(400).json({ message: "Product ID is required" })
    }

    const user = await User.findById(userId)
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }

    const targetQty = Number(quantity) > 0 ? Number(quantity) : 1
    const cartItemIndex = user.cart.findIndex(item => getProductId(item) === productId)

    if (cartItemIndex > -1) {
        if (typeof user.cart[cartItemIndex] === 'object' && user.cart[cartItemIndex].product) {
            user.cart[cartItemIndex].quantity = targetQty
        } else {
            user.cart[cartItemIndex] = { product: productId, quantity: targetQty }
        }
    } else {
        user.cart.push({ product: productId, quantity: targetQty })
    }

    await user.save()

    const updatedUser = await User.findById(userId).populate({
        path: "cart.product",
        select: "productName productDescription productStockQty productStatus productPrice productImageUrl"
    })

    const cartItems = []
    for (let item of updatedUser.cart) {
        if (item && item.product && item.product.productName) {
            cartItems.push({
                _id: item._id,
                quantity: item.quantity || 1,
                product: item.product
            })
        }
    }

    res.status(200).json({ message: "Product quantity updated successfully", cartItems })
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