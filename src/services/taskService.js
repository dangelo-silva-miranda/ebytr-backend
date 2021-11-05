const { StatusCodes } = require('http-status-codes');
const taskModel = require('../models/taskModel');
const { taskDataSchema, statusSchema } = require('./schemas');

const titleCase = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

const createTask = async ({ note, status }) => {
  const { error } = taskDataSchema.validate({ note, status });
  if (error) { // error.isJoi indentifica se o erro foi do tipo Joi
    const { message } = error.details[0];
    return { code: StatusCodes.BAD_REQUEST, message };
  }

  const newNote = titleCase(note.trim());

  const taskExists = await taskModel.taskExists(newNote);
  if (taskExists) {
    return { code: StatusCodes.CONFLICT, message: 'Task already registered.' };
  }

  const task = await taskModel.createTask({ note: newNote, status });

  return {
    code: StatusCodes.CREATED,
    task,
  };
};

const findAllTasks = async () => {
  const tasks = await taskModel.findAllTasks();

  return {
    code: StatusCodes.OK,
    tasks,
  };
};

const updateTaskById = async ({ id, note, status }) => {
  const { error } = taskDataSchema.validate({ note, status });
  if (error) { // error.isJoi indentifica se o erro foi do tipo Joi
    const { message } = error.details[0];
    return { code: StatusCodes.BAD_REQUEST, message };
  }

  const newNote = titleCase(note.trim());

  const taskExists = await taskModel.taskExists(newNote);
  if (taskExists) {
    return { code: StatusCodes.CONFLICT, message: 'Task already registered.' };
  }

  const task = await taskModel.updateTaskById({ id, note: newNote, status });

  if (!task) {
    return { code: StatusCodes.BAD_REQUEST, message: '"taskId" not found.' };
  }

  return {
    code: StatusCodes.OK,
    task,
  };
};

const updateTaskStatusById = async ({ id, status }) => {
  const { error } = statusSchema.validate(status);
  if (error) { // error.isJoi indentifica se o erro foi do tipo Joi
    const { message } = error.details[0];
    return { code: StatusCodes.BAD_REQUEST, message };
  }

  const task = await taskModel.updateTaskStatusById({ id, status });

  if (!task) {
    return { code: StatusCodes.BAD_REQUEST, message: '"taskId" not found.' };
  }

  return {
    code: StatusCodes.OK,
    task,
  };
};

const deleteTaskById = async (id) => {
  const task = await taskModel.deleteTaskById(id);

  if (!task) {
    return { code: StatusCodes.BAD_REQUEST, message: '"taskId" not found.' };
  }

  return {
    code: StatusCodes.OK,
    task,
  };
};

module.exports = {
  createTask,
  findAllTasks,
  updateTaskById,
  updateTaskStatusById,
  deleteTaskById,
};
