import { useEffect, useState } from "react";
import API from "../services/api";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const { data } = await API.get("/tasks");
    setTasks(data);
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>My Tasks</h2>

      {tasks.map((task) => (
        <div key={task._id}>
          <h4>{task.title}</h4>
          <p>Status: {task.status}</p>

          <button onClick={() => updateStatus(task._id, "in-progress")}>
            Start
          </button>

          <button onClick={() => updateStatus(task._id, "done")}>
            Done
          </button>
        </div>
      ))}
    </div>
  );
};

export default Tasks;