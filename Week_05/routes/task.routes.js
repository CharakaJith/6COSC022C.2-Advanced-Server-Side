const express = require('express');
const taskController = require('../controllers/task.controller');

const taskRouter = express.Router();

taskRouter.post('/', taskController.createNewTask);
taskRouter.get('/', taskController.getAllTasks);
taskRouter.get('/:id', taskController.getTaskById);
taskRouter.put('/:id', taskController.updateTask);
taskRouter.delete('/:id', taskController.deleteTask);

module.exports = taskRouter;
