const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
} = require("../controllers/projectController");
const authMiddleware = require("../middlewares/authMiddleware");

// Protected routes
router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getProjects);

module.exports = router;
