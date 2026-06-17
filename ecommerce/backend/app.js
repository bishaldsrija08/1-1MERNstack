const express = require("express");
const app = express();

// Load environment variables
require("dotenv").config()

// Import DB connection
const connectDB = require("./database/connection")

// Middleware for parsing JSON data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect to the database
connectDB()

// Routes heres
const authRoutes = require("./routes/auth/authRoutes")
const productRoutes = require("./routes/admin/product/productRoutes")

app.use("/api/admin/product", productRoutes)
app.use("/api/auth", authRoutes)


app.get("/", (req, res)=>{
    res.send("<h1>Project chalirako xa! Hami backend handai xum! UI paxi banaune ho!</h1>")
})









// Start the server
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})