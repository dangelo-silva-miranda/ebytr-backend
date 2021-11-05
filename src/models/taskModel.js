const connection = require('../database/connection');

const createTask = ({ task, status }) => {
  connection.getConnection()
    .then((db) => db.collection('tasks')
      .insertOne({
        task, status, createdAt: new Date(Date.now()), updatedAt: new Date(Date.now()),
      }))
    .then(({ insertedId, ops: [result] }) => ({
      id: insertedId,
      task: result.task,
      status: result.status,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    }));
};

module.exports = {
  createTask,
};
