import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err.response?.data?.message);
      if (err.response?.status === 401) logout();
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async () => {
    const title = prompt("Enter project title:");
    if (title) {
      try {
        await API.post("/projects", { title });
        fetchProjects(); // reload projects after creation
      } catch (err) {
        alert(err.response?.data?.message || "Failed to create project");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-8 text-white">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Projects</h1>
        <button
          onClick={logout}
          className="bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition text-sm font-semibold"
        >
          Logout
        </button>
      </header>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/*  New Project Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={handleCreateProject}
          className="flex flex-col items-center justify-center cursor-pointer bg-white/10 backdrop-blur-md rounded-2xl p-10 shadow-lg hover:shadow-2xl transition"
        >
          <PlusCircle className="w-16 h-16 text-blue-400 mb-4" />
          <h2 className="text-lg font-semibold">Create New Project</h2>
        </motion.div>

        {/* Existing Projects */}
        {projects.map((project) => (
          <motion.div
            key={project._id}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(`/projects/${project._id}`)}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition cursor-pointer"
          >
            <h2 className="text-xl font-bold mb-2">{project.title}</h2>
            <p className="text-gray-300 text-sm">
              {project.tasks.length} Tasks
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
