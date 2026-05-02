const express = require("express");
const router = express.Router();

const {
  createProject,
  getMyProjects,
  addMember,
} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Admin create project
router.post("/", protect, authorizeRoles("admin"), createProject);

// Get my projects
router.get("/", protect, getMyProjects);

// Add member (Admin only)
router.post("/add-member", protect, authorizeRoles("admin"), addMember);

module.exports = router;