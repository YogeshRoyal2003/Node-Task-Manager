//This was used for im-memory data storage
// let tasks = [];

// module.exports = tasks;

//Below is the one with MongoDB connection to store data 
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Task", taskSchema);
