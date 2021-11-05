const { StatusCodes } = require('http-status-codes');
const taskModel = require('../models/taskModel');

const createTask = async ({ note, status }) => {
  const task = await taskModel.createUser({ note, status });

  return {
    status: StatusCodes.CREATED,
    message: task,
  };
};

module.exports = {
  createTask,
};
