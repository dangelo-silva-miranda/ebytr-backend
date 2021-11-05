const { ObjectId } = require('mongodb');
const connection = require('../database/connection');

const taskExists = async (note) => {
  const task = await connection.getConnection()
    .then((db) => db.collection('tasks').findOne({ note }));
  return task !== null;
};

const createTask = async ({ note, status }) => connection.getConnection()
  .then((db) => db.collection('tasks')
    .insertOne({
      note, status, createdAt: new Date(Date.now()), updatedAt: new Date(Date.now()),
    }))
  .then(({ insertedId, ops: [result] }) => ({
    id: insertedId.toString(),
    note: result.note,
    status: result.status,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  }));

const findAllTasks = async () => connection.getConnection()
  .then((db) => db.collection('tasks')
    .find(
      {},
      {
        projection: {
          id: { $toString: '$_id' },
          note: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
          _id: 0,
        },
      },
    ).toArray());

const updateTaskById = async ({ id, note, status }) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection.getConnection()
    .then((db) => db.collection('tasks')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        {
          $set: { note, status },
          $currentDate: {
            updatedAt: true,
          },
        },
        {
          returnOriginal: false,
          projection: {
            id: { $toString: '$_id' },
            note: 1,
            status: 1,
            createdAt: 1,
            updatedAt: 1,
            _id: 0,
          },
        },
      ))
    .then(({ value }) => value);
};

const updateTaskStatusById = async ({ id, status }) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection.getConnection()
    .then((db) => db.collection('tasks')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        {
          $set: { status },
          $currentDate: {
            updatedAt: true,
          },
        },
        {
          returnOriginal: false,
          projection: {
            id: { $toString: '$_id' },
            note: 1,
            status: 1,
            createdAt: 1,
            updatedAt: 1,
            _id: 0,
          },
        },
      ))
    .then(({ value }) => value);
};

module.exports = {
  createTask,
  taskExists,
  findAllTasks,
  updateTaskById,
  updateTaskStatusById,
};
