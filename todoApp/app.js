const express = require('express');
const connectDB = require('./database/connection');
const app = express();

// Import the database connection function
connectDB()

// Middleware to parse JSON bodies
app.use(express.json());











// Start the server
const port = 3000;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})