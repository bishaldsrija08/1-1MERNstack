const express = require("express")
const app = express() // create an instance of express
const mongoose = require("mongoose")
const Blog = require("./model/blogModel")

// parse json data
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// Create blog
app.post("/blogs", async (req,res)=>{
    const blogTitle = req.body.blogTitle
    const blogSubTitle = req.body.blogSubTitle
    const blogDescription = req.body.blogDescription

    if(!blogTitle || !blogSubTitle || !blogDescription) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    await Blog.create({
        blogTitle,
        blogSubTitle,
        blogDescription
    })

    res.status(200).json({
        message: "Blog created successfully"
    })
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