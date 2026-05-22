const { createTask, getAllTasks, getSingleTask, updateTask, deleteTask } = require('../controllers/todoController');

const router = require('express').Router();

router.route("/tasks").post(createTask).get(getAllTasks);
router.route("/tasks/:id").get(getSingleTask).patch(updateTask).delete(deleteTask)



module.exports = router;