const taskService = require('../services/taskService');

const createTask = async (req, res) => {
  const { code, message, task } = await taskService.createTask(req.body);

  if (!task) {
    return res.status(code).json({ message });
  }

  return res.status(code).json(task);
};

const findAllTasks = async (_req, res) => {
  const { code, tasks } = await taskService.findAllTasks();
  return res.status(code).json(tasks);
};

const updateTaskById = async (req, res) => {
  const { params: { id }, body: { note, status } } = req;
  const { code, message, task } = await taskService.updateTaskById({ id, note, status });

  if (!task) {
    return res.status(code).json({ message });
  }

  return res.status(code).json(task);
};

const updateTaskStatusById = async (req, res) => {
  const { params: { id }, body: { status } } = req;
  const { code, message, task } = await taskService.updateTaskStatusById({ id, status });

  if (!task) {
    return res.status(code).json({ message });
  }

  return res.status(code).json(task);
};

module.exports = {
  createTask,
  findAllTasks,
  updateTaskById,
  updateTaskStatusById,
};
