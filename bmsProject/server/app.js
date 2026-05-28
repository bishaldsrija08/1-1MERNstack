const express = require("express")
const app = express() // create an instance of express
const connectToDb = require("./database")
const cors = require("cors")

// Cors
app.use(cors({
    origin: "http://localhost:5173", // allow requests from this origin
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

// parse json data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectToDb() // connect to the database

// importing the blog routes
const blogRoutes = require("./routes/blogRoutes")
app.use("/api", blogRoutes) // using the blog routes with the prefix /api

// Server starting
const port = 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})