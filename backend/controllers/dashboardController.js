const Task = require("../models/Task");

// Dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const total = await Task.countDocuments({ assignedTo: userId });

    const completed = await Task.countDocuments({
      assignedTo: userId,
      status: "done",
    });

    const pending = await Task.countDocuments({
      assignedTo: userId,
      status: "todo",
    });

    const inProgress = await Task.countDocuments({
      assignedTo: userId,
      status: "in-progress",
    });

    const overdue = await Task.countDocuments({
      assignedTo: userId,
      dueDate: { $lt: new Date() },
      status: { $ne: "done" },
    });

    res.json({
      total,
      completed,
      pending,
      inProgress,
      overdue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};