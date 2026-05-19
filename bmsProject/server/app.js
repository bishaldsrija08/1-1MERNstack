const express = require("express")
const app = express() // create an instance of express
const mongoose = require("mongoose")




app.get("/", (req, res) => {
    res.send("We're learning web development with Express.js!")
})


app.get("/about", (req, res) => {
    res.send("This is the about page.")
})

app.get("/login", (req, res) => {
    res.send("This is the login page.")
})

app.get("/signup", (req, res) => {
    res.send("This is the signup page.")
})

// DB connection
const dbURI = "mongodb+srv://bishaldsrijal1_db_user:Nb5Z5Dt9iD4vZJi6@cluster0.fiviebf.mongodb.net/?appName=Cluster0"

async function connectToDb() {
    try {
        await mongoose.connect(dbURI)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
    }
}

connectToDb()
// Server starting
const port = 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})