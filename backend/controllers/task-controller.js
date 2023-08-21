import Task from "../models/Task.js";

const handleError = (res, err) => {
  res.status(500).json(err);
};

const getTasks = (req, res) => {
  Task.find()
    .sort({ time: -1 })
    .then((task) => {
      res.status(200).json(task);
    })
    .catch((err) => handleError(res, err));
};

// const getTasksByParams = (req, res) => {
//   Task.find({
//     $text: {
//       $description: searchQuery,
//     },
//   })
//     .then((task) => {
//       res.status(200).json(task);
//     })
//     .catch((err) => handleError(res, err));
// };

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
  console.log(req.params);
  Task.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => handleError(res, err));
};

const updateTask = (req, res) => {
  Task.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => handleError(res, err));
};

export { getTasks, addTask, deleteTask, updateTask };
