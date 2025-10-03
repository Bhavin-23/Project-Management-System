const Task = require("../models/Task");

// Create Task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// List Tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("project_id", "name");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit Task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
