const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

// Protected Routes
router.post("/:projectId/tasks", authMiddleware, createTask);
router.get("/:projectId/tasks", authMiddleware, getTasks);
router.put("/task/:taskId", authMiddleware, updateTask);
router.delete("/task/:taskId", authMiddleware, deleteTask);

module.exports = router;
