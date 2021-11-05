const express = require('express');
const taskController = require('../controllers/taskController');

const taskRouter = express.Router();

taskRouter.post('/', taskController.createTask);

taskRouter.get('/', taskController.findAllTasks);

taskRouter.put('/:id', taskController.updateTaskById);

taskRouter.put('/:id', taskController.updateTaskStatusById);

module.exports = {
  taskRouter,
};
