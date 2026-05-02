const express = require("express");
const router = express.Router();

const {
  createTask,
  getMyTasks,
  updateTaskStatus,
  getOverdueTasks,
} = require("../controllers/taskController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Admin create task
router.post("/", protect, authorizeRoles("admin"), createTask);

// Get my tasks
router.get("/", protect, getMyTasks);

// Update status
router.put("/:id", protect, updateTaskStatus);

// Overdue
router.get("/overdue", protect, getOverdueTasks);

module.exports = router;