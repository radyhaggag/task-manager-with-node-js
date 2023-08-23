const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    let tasks = await Task.find({});
    res.status(200).send({ tasks });
  } catch (error) {
    res.status(500).send(error);
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTask = async (req, res) => {
  try {
    let { id: taskId } = req.params;
    let task = await Task.findOne({ _id: taskId });
    if (!task) {
      return res.status(404).send({ msg: `Task not found wit id : ${taskId}` });
    }
    res.status(200).send({ task });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateTask = async (req, res) => {
  try {
    let { id: taskId } = req.params;
    let { completed, name } = req.body;
    let task = await Task.findOne({ _id: taskId });
    if (!task) {
      return res.status(404).send({ msg: `Task not found wit id : ${taskId}` });
    }
    await task.updateOne({
      completed: completed,
      name: name,
    });
    if (completed) task.completed = completed;
    if (name) task.name = name;
    res.status(200).send({ msg: "Task Updated Successfully.", task: task });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    let { id: taskId } = req.params;
    let task = await Task.findOne({ _id: taskId });
    if (!task) {
      return res.status(404).send({ msg: `Task not found wit id : ${taskId}` });
    }
    await task.deleteOne();
    res.status(200).send({ msg: "Task Deleted Successfully." });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
