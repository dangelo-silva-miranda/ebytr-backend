const express = require('express');
const taskController = require('../controllers/taskController');

const taskRouter = express.Router();

taskRouter.post('/', taskController.createTask);

taskRouter.get('/', taskController.findAllTasks);

taskRouter.put('/:id/status', taskController.updateTaskStatusById);

taskRouter.put('/:id', taskController.updateTaskById);

module.exports = {
  taskRouter,
};
