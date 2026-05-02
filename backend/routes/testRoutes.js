const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Protected route (any logged in user)
router.get("/user", protect, (req, res) => {
  res.json({
    message: "User access granted",
    user: req.user,
  });
});

// Admin only route
router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({
    message: "Admin access granted",
  });
});

module.exports = router;