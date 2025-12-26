const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const taskRoutes = require("./routes/taskRoutes");

const app = express();
// const PORT = 3000;

// Middleware to read JSON body
app.use(express.json());
app.use(express.static("public"));

//Database connection 
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.use("/tasks", taskRoutes);

// Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
