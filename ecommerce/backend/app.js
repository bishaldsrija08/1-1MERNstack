const express = require("express");
const app = express();

// Load environment variables
require("dotenv").config()

// trust the platform's reverse proxy so req.protocol reflects https in production
app.set("trust proxy", 1)

// cors setup
const cors = require("cors");
const allowedOrigins = (process.env.CORS_ORIGINS || "https://digital-momo-five.vercel.app,http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)

app.use(cors({
    origin: (origin, callback) => {
        // allow non-browser requests (no origin header) and any whitelisted origin
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true)
        }
        return callback(new Error("Not allowed by CORS"))
    },
}))

// Import DB connection
const connectDB = require("./database/connection")

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
const adminReviewRoutes = require("./routes/admin/review/reviewRoutes")

// Using Routes here
app.use("/api/admin/product", productRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/user",profileRoutes)
app.use("/api/globals", globalRoutes)
app.use("/api/user/cart", cartRoutes)
app.use("/api/user", orderUserRoutes)
app.use("/api/user/review", reviewRoutes)
app.use("/api/admin/order", adminOrderRoutes)
app.use("/api/admin/review", adminReviewRoutes)

// 404 handler for unmatched routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" })
})

// global error handler - avoid leaking internals to the client
app.use((err, req, res, next) => {
    console.error(err)
    const status = err.status || 500
    res.status(status).json({ message: err.message || "Something went wrong" })
})

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})