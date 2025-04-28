const Task = require("../models/Task");
const Project = require("../models/Project");

// Create a task in a project
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const projectId = req.params.projectId;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (String(project.user) !== String(req.user._id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const newTask = await Task.create({
      title,
      description,
      project: projectId,
    });

    project.tasks.push(newTask._id);
    await project.save();

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tasks in a project
exports.getTasks = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    const project = await Project.findById(projectId).populate("tasks");
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (String(project.user) !== String(req.user._id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json(project.tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { title, description, status } = req.body;

    const task = await Task.findById(taskId).populate("project");
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (String(task.project.user) !== String(req.user._id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    if (status === "Completed") {
      task.completedAt = new Date();
    }

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a task
// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const task = await Task.findById(taskId).populate("project");
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (String(task.project.user) !== String(req.user._id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Task.findByIdAndDelete(taskId); // ✅

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
