require('dotenv').config()
const express = require("express");
const app = express();
const tasks = require("./task.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

// Input validation middleware
const validateTaskInput = (req, res, next) => {
  const { title, description, completed, priority } = req.body;
  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title is required" });
  }
  if (!description || description.trim() === "") {
    return res.status(400).json({ message: "Description is required" });
  }
  if (completed !== undefined && typeof completed !== "boolean") {
    return res
      .status(400)
      .json({ message: "Completed status must be a boolean" });
  }
  if (priority && !["low", "medium", "high"].includes(priority)) {
    return res
      .status(400)
      .json({ message: "Priority must be low, medium, or high" });
  }
  next();
};

// GET all tasks
app.get("/api/v1/tasks", (req, res) => {
  let filteredTasks = tasks.tasks;
  // Filter by completion status
  if (req.query.completed !== undefined) {
    const completed = req.query.completed.toLowerCase() === "true";
    filteredTasks = filteredTasks.filter(
      (task) => task.completed === completed
    );
  }
  // Sort by creation date (assuming tasks have a 'createdAt' field)
  filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.status(200).json({ tasks: filteredTasks });
});

// GET task by ID
app.get("/api/v1/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.tasks.find((task) => task.id === taskId);
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// GET tasks by priority level
app.get("/api/v1/tasks/priority/:level", (req, res) => {
  const priorityLevel = req.params.level.toLowerCase();
  if (!["low", "medium", "high"].includes(priorityLevel)) {
    return res.status(400).json({ message: "Invalid priority level" });
  }

  const filteredTasks = tasks.tasks.filter(
    (task) => task.priority === priorityLevel
  );
  res.status(200).json({ tasks: filteredTasks });
});

// POST create new task
app.post("/api/v1/tasks", validateTaskInput, (req, res) => {
  const newTask = {
    id: tasks.tasks.length + 1,
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed !== undefined ? req.body.completed : false,
    priority: req.body.priority || "medium", // Default to medium if not specified
    createdAt: new Date().toISOString(),
  };
  tasks.tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update task
app.put("/api/v1/tasks/:id", validateTaskInput, (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    tasks.tasks[taskIndex] = {
      ...tasks.tasks[taskIndex],
      ...req.body,
      id: taskId,
      priority: req.body.priority || tasks.tasks[taskIndex].priority, // Keep existing priority if not specified
    };
    res.status(200).json(tasks.tasks[taskIndex]);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// DELETE task
app.delete("/api/v1/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    tasks.tasks.splice(taskIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// 404 handler for non-existent routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
