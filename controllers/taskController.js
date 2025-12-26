const Task = require("../models/taskModel");

exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
};

exports.getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};



// const tasks = require("../models/taskModel");

// // Get all tasks
// exports.getAllTasks = (req, res) => {
//   res.status(200).json(tasks);
// };

// // Create a task
// exports.createTask = (req, res) => {
//   const { title } = req.body;

//   if (!title) {
//     return res.status(400).json({ message: "Title is required" });
//   }

//   const newTask = {
//     id: Date.now(),
//     title,
//     completed: false
//   };

//   tasks.push(newTask);
//   res.status(201).json(newTask);
// };

// // Get task by ID
// exports.getTaskById = (req, res) => {
//   const task = tasks.find(t => t.id == req.params.id);

//   if (!task) {
//     return res.status(404).json({ message: "Task not found" });
//   }

//   res.json(task);
// };

// // Update task
// exports.updateTask = (req, res) => {
//   const task = tasks.find(t => t.id == req.params.id);

//   if (!task) {
//     return res.status(404).json({ message: "Task not found" });
//   }

//   task.title = req.body.title || task.title;
//   task.completed = req.body.completed ?? task.completed;

//   res.json(task);
// };

// // Delete task
// exports.deleteTask = (req, res) => {
//   const index = tasks.findIndex(t => t.id == req.params.id);

//   if (index === -1) {
//     return res.status(404).json({ message: "Task not found" });
//   }

//   tasks.splice(index, 1);
//   res.json({ message: "Task deleted successfully" });
// };
