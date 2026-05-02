import { useEffect, useState } from "react";
import API from "../services/api";

const CreateTask = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    projectId: "",
    assignedTo: "",
  });

  // fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await API.get("/projects");
      setProjects(data);
    };

    fetchProjects();
  }, []);

  // fetch users (simple approach)
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await API.get("/auth/users"); // 👈 ye banana padega backend me
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tasks", form);
      alert("Task Assigned ✅");
    } catch (err) {
      console.log("Error assigning task:", err);
      alert("Error assigning task");
    }
  };

  return (
    <div>
      <h2>Assign Task</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Task title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        {/* Project Dropdown */}
        <select
          onChange={(e) => setForm({ ...form, projectId: e.target.value })}
        >
          <option>Select Project</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* User Dropdown */}
        <select
          onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
        >
          <option>Select Member</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>

        <button type="submit">Assign Task</button>
      </form>
    </div>
  );
};

export default CreateTask;