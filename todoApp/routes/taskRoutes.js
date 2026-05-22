const { createTask } = require('../controllers/todoController');

const router = require('express').Router();

router.route("/tasks").post(createTask);



module.exports = router;