const connection = require('../database/connection');

const taskExists = async (note) => {
  const task = await connection.getConnection()
    .then((db) => db.collection('tasks').findOne({ note }));
  return task !== null;
};

const createTask = ({ note, status }) => {
  connection.getConnection()
    .then((db) => db.collection('tasks')
      .insertOne({
        note, status, createdAt: new Date(Date.now()), updatedAt: new Date(Date.now()),
      }))
    .then(({ insertedId, ops: [result] }) => ({
      id: insertedId,
      note: result.note,
      status: result.status,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    }));
};

module.exports = {
  createTask,
};
