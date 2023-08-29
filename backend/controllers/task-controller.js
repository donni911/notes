import Task from "../models/Task.js";
import { handleError } from "./helpers.js";

const getTasks = (req, res) => {
  const userId = req.userData._id;
  const searchQuery = req.query.q;

  if (searchQuery) {
    Task.find({
      user:userId,
      $text: {
        $search: searchQuery,
      },
    })
      .then((task) => {
        res.status(200).json(task);
      })
      .catch((err) => handleError(res, err));
  } else {
    Task.find({ user: userId })
      .sort({ time: -1 })
      .then((tasks) => {
        if (!tasks) {
          res.status(404).json({ error: "Tasks was not found." });
        }
        res.status(200).json(tasks);
      })
      .catch((err) => handleError(res, { ...err, error: "Internal server" }));
  }
};

const addTask = (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then((task) => {
      res.status(201).json(task);
    })
    .catch((err) => handleError(res, err));
};

const deleteTask = (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: "Task was not found." });
      }
      res.status(200).json(result);
    })
    .catch((err) => handleError(res, { err, error: "Error deleting task" }));
};

const updateTask = (req, res) => {
  Task.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => handleError(res, err));
};

export { getTasks, addTask, deleteTask, updateTask };
