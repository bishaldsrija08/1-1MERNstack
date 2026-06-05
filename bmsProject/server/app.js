const express = require("express")
const app = express() // create an instance of express
const connectToDb = require("./database")
const cors = require("cors")

// Cors
app.use(cors({
    origin: "https://1-1-mer-nstack.vercel.app"
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