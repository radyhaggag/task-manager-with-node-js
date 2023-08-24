const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res, next) => {
  let tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  let { id: taskId } = req.params;
  let task = await Task.findOne({ _id: taskId });
  if (!task) {
    return next(createCustomError(`Task not found wit id : ${taskId}`, 404));
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  let { id: taskId } = req.params;
  let task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`Task not found wit id : ${taskId}`, 404));
  }
  res.status(200).json({ msg: "Task Updated Successfully.", task: task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  let { id: taskId } = req.params;
  let task = await Task.findOneAndDelete({ _id: taskId });
  if (!task) {
    return next(createCustomError(`Task not found wit id : ${taskId}`, 404));
  }
  res.status(200).json({ msg: "Task Deleted Successfully.", task: task });
});

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
