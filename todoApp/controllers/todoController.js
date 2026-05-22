const Todo = require("../model/todoModel");

// Create task
const createTask = async (req, res) => {
    // const title = req.body.title;
    // const description = req.body.description;
    const { title, description } = req.body; // Object destructuring
    if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
    }

    Todo.create({
        title,
        description
    })

    res.status(201).json({ message: "Task created successfully" });
}
// Get all tasks

// Get single task

// Update task

// Delete task


module.exports = {
    createTask
}