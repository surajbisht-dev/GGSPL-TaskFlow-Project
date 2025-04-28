const Project = require("../models/Project");
const User = require("../models/User");

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId).populate("projects");

    if (user.projects.length >= 4) {
      return res
        .status(400)
        .json({ message: "Project limit reached (4 projects max)" });
    }

    const newProject = await Project.create({ title, user: userId });

    user.projects.push(newProject._id);
    await user.save();

    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all projects for a user
exports.getProjects = async (req, res) => {
  try {
    const userId = req.user._id;
    const projects = await Project.find({ user: userId }).populate("tasks");
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
