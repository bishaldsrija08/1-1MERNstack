const express = require("express");
const app = express();

// Import DB connection
const connectDB = require("./database/connection")

// Connect to the database
connectDB()



app.get("/", (req, res)=>{
    res.send("<h1>Project chalirako xa! Hami backend handai xum! UI paxi banaune ho!</h1>")
})









// Start the server
app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})