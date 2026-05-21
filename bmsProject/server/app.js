const express = require("express")
const app = express() // create an instance of express
const Blog = require("./model/blogModel")
const connectToDb = require("./database")

// parse json data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectToDb() // connect to the database

// Create blog
app.post("/blogs", async (req, res) => {
    const blogTitle = req.body.blogTitle
    const blogSubTitle = req.body.blogSubTitle
    const blogDescription = req.body.blogDescription

    if (!blogTitle || !blogSubTitle || !blogDescription) {
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

// Get all blogs
app.get("/blogs", async (req, res) => {
    const blogs = await Blog.find()
    res.status(200).json({
        message: "Blogs retrieved successfully",
        data: blogs
    })
})

// Single get

app.get("/blogs/:id", async (req, res) => {
    const id = req.params.id
    const singleBlog = await Blog.findById(id)
    if (!singleBlog) {
        return res.status(404).json({
            message: "Blog not found"
        })
    }
    res.status(200).json({
        message: "Blog retrieved successfully",
        data: singleBlog
    })
})

// Delete a blog
app.delete("/blogs/:id", async (req, res) => {
    const id = req.params.id
    await Blog.findByIdAndDelete(id)
    res.status(200).json({
        message: "Blog deleted successfully"
    })
})

// Update a blog
app.patch("/blogs/:id", async (req, res) => {
    const id = req.params.id // get the id from the url parameters

    const blogTitle = req.body.blogTitle
    const blogSubTitle = req.body.blogSubTitle
    const blogDescription = req.body.blogDescription

    if (!blogTitle || !blogSubTitle || !blogDescription) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    await Blog.findByIdAndUpdate(id, {
        blogTitle,
        blogSubTitle,
        blogDescription
    })

    res.status(200).json({
        message: "Blog updated successfully"
    })

})

// Server starting
const port = 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})