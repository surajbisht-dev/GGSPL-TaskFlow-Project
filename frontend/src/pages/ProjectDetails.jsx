import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit2, Edit3, RefreshCcw } from "lucide-react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function ProjectDetails() {
  const { id } = useParams();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [projectTitle, setProjectTitle] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await API.get(`/${id}/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error(err.response?.data?.message);
      if (err.response?.status === 401) logout();
    }
  };

  const fetchProjectTitle = async () => {
    try {
      const res = await API.get("/projects");
      const project = res.data.find((p) => p._id === id);
      if (project) setProjectTitle(project.title);
      else navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchProjectTitle();
  }, [id]);

  const handleCreateTask = async () => {
    const title = prompt("Task Title:");
    const description = prompt("Task Description:");
    if (title) {
      try {
        await API.post(`/${id}/tasks`, { title, description });
        fetchTasks();
      } catch (err) {
        console.error(err.response?.data?.message);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure to delete this task?")) {
      try {
        await API.delete(`/task/${taskId}`);
        fetchTasks();
      } catch (err) {
        console.error(err.response?.data?.message);
      }
    }
  };

  const handleUpdateTitle = async (taskId) => {
    const newTitle = prompt("Enter new Title:");
    if (newTitle) {
      try {
        await API.put(`/task/${taskId}`, { title: newTitle });
        fetchTasks();
      } catch (err) {
        console.error(err.response?.data?.message);
      }
    }
  };

  const handleUpdateDescription = async (taskId) => {
    const newDescription = prompt("Enter new Description:");
    if (newDescription) {
      try {
        await API.put(`/task/${taskId}`, { description: newDescription });
        fetchTasks();
      } catch (err) {
        console.error(err.response?.data?.message);
      }
    }
  };

  const handleUpdateStatus = async (taskId) => {
    const newStatus = prompt(
      "Update Status (Pending, In Progress, Completed):"
    );
    if (newStatus) {
      try {
        await API.put(`/task/${taskId}`, { status: newStatus });
        fetchTasks();
      } catch (err) {
        console.error(err.response?.data?.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-8 text-white">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">{projectTitle}</h1>
          <p className="text-gray-400 text-sm">{tasks.length} Tasks</p>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition text-sm font-semibold"
        >
          Back
        </button>
      </header>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/*  New Task Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={handleCreateTask}
          className="flex flex-col items-center justify-center cursor-pointer bg-white/10 backdrop-blur-md rounded-2xl p-10 shadow-lg hover:shadow-2xl transition"
        >
          <Plus className="w-16 h-16 text-blue-400 mb-4" />
          <h2 className="text-lg font-semibold">Add New Task</h2>
        </motion.div>

        {/* Task Cards */}
        {tasks.map((task) => (
          <motion.div
            key={task._id}
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition relative"
          >
            <h2 className="text-xl font-bold mb-2">{task.title}</h2>
            <p className="text-gray-300 text-sm mb-4">{task.description}</p>
            <p className="text-sm">
              Status:{" "}
              <span
                className={`${
                  task.status === "Completed"
                    ? "text-green-400"
                    : task.status === "In Progress"
                    ? "text-yellow-400"
                    : "text-red-400"
                } font-semibold`}
              >
                {task.status}
              </span>
            </p>

            {/* Actions */}
            <div className="flex gap-2 mt-4 flex-wrap">
              <button
                onClick={() => handleUpdateTitle(task._id)}
                className="bg-blue-500 p-2 rounded-full hover:bg-blue-600"
                title="Edit Title"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleUpdateDescription(task._id)}
                className="bg-yellow-400 p-2 rounded-full hover:bg-yellow-500"
                title="Edit Description"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleUpdateStatus(task._id)}
                className="bg-purple-500 p-2 rounded-full hover:bg-purple-600"
                title="Update Status"
              >
                <RefreshCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteTask(task._id)}
                className="bg-red-500 p-2 rounded-full hover:bg-red-600"
                title="Delete Task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
