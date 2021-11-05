const taskService = require('../services/taskService');

const createTask = async (req, res) => {
  const { code, message, task } = await taskService.createTask(req.body);

  if (!task) {
    return res.status(code).json({ message });
  }

  return res.status(code).json({ task });
};

const findAllTasks = async (_req, res) => {
  const { code, tasks } = await taskService.findAllTasks();

  return res.status(code).json({ tasks });
};

module.exports = {
  createTask,
  findAllTasks,
};
