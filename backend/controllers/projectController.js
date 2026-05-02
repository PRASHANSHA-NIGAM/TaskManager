const Project = require("../models/Project");

// Create Project (Admin only)
exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      createdBy: req.user._id,
      teamMembers: [req.user._id], // admin automatically added
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all projects of logged-in user
exports.getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      teamMembers: req.user._id,
    }).populate("teamMembers", "name email");

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add member to project (Admin only)
exports.addMember = async (req, res) => {
  try {
    const { projectId, userId } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.teamMembers.push(userId);
    await project.save();

    res.json({ message: "Member added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};