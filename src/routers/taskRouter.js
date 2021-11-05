const express = require('express');
const taskController = require('../controllers/taskController');

const taskRouter = express.Router();

taskRouter.post('/', taskController.createTask);

taskRouter.get('/', taskController.findAllTasks);

module.exports = {
  taskRouter,
};
