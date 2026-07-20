const express = require("express");
const app = express();

// Import DB connection
const connectDB = require("./database/connection")

// Load environment variables
require("dotenv").config()

// Connect to the database
connectDB()

// Middleware for parsing JSON data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Access to uploads folder
app.use("/uploads", express.static("uploads"))

// Importing Routes here
const authRoutes = require("./routes/auth/authRoutes")
const productRoutes = require("./routes/admin/product/productRoutes")
const profileRoutes = require("./routes/user/myProfile/profileRoutes")
const globalRoutes = require("./routes/global/globalRoutes")
const cartRoutes = require("./routes/user/cart/cartRoutes")
const orderUserRoutes = require("./routes/user/order/orderRoutes")
const reviewRoutes = require("./routes/user/review/reviewRoutes")
const adminOrderRoutes = require("./routes/admin/order/orderRoutes")

// Using Routes here
app.use("/api/admin/product", productRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/user",profileRoutes)
app.use("/api/globals", globalRoutes)
app.use("/api/user/cart", cartRoutes)
app.use("/api/user", orderUserRoutes)
app.use("/api/user/review", reviewRoutes)
app.use("/api/admin/order", adminOrderRoutes)



// Start the server
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})