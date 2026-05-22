const express = require('express');
const app = express();
const connectDB = require('./database/connection');

// Import the database connection function
connectDB()

// Middleware to parse JSON bodies
app.use(express.json());

// Import routes
const taskRoutes = require("./routes/taskRoutes")
// Use routes
app.use("/", taskRoutes);











// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})