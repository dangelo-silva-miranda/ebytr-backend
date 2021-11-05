const { StatusCodes } = require('http-status-codes');
const taskModel = require('../models/taskModel');

const titleCase = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

const createTask = async ({ note: newNote, status }) => {
  const note = titleCase(newNote.trim());

  const taskExists = await taskModel.taskExists(note);
  if (taskExists) {
    return { code: StatusCodes.CONFLICT, message: 'Task already registered.' };
  }

  const task = await taskModel.createTask({ note, status });

  return {
    code: StatusCodes.CREATED,
    message: task,
  };
};

module.exports = {
  createTask,
};
