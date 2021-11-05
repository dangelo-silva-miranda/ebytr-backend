const { StatusCodes } = require('http-status-codes');
const taskModel = require('../models/taskModel');
const { taskDataSchema } = require('./schemas');

const titleCase = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

const createTask = async ({ note, status }) => {
  const { error } = taskDataSchema.validate({ note, status });
  if (error) { // error.isJoi indentifica se o erro foi do tipo Joi
    const { message } = error.details[0];
    return { code: StatusCodes.BAD_REQUEST, message };
  }

  const newNote = titleCase(note.trim());

  const taskExists = await taskModel.taskExists(note);
  if (taskExists) {
    return { code: StatusCodes.CONFLICT, message: 'Task already registered.' };
  }

  const task = await taskModel.createTask({ note: newNote, status });

  return {
    code: StatusCodes.CREATED,
    message: task,
  };
};

module.exports = {
  createTask,
};
