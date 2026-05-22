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
const getAllTasks = async (req, res)=>{
    const tasks = await Todo.find();
    res.status(200).json({data: tasks, message: "Tasks fetched successfully"});
}

// Get single task
const getSingleTask = async (req, res)=>{
    const id = req.params.id;
    const task = await Todo.findById(id);
    if(!task){
        return res.status(404).json({message: "Task not found"});
    }

    res.status(200).json({data: task, message: "Task fetched successfully"});

}

// Update task
const updateTask = async (req, res)=>{
    const id = req.params.id;
    const { title, description, completed } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
    }

    await Todo.findByIdAndUpdate(id, {
        title,
        description,
        completed
    })
    res.status(200).json({ message: "Task updated successfully" });
}

// Delete task
const deleteTask = async (req, res)=>{
    const id = req.params.id;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully" });
}


module.exports = {
    createTask,
    getAllTasks,
    getSingleTask,
    updateTask,
    deleteTask
}