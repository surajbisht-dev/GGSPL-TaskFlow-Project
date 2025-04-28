import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import API from "../services/api";
export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/signup", formData);
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response.data.message);
      alert(err.response.data.message || "Signup failed");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 p-6">
      <motion.div
        className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md w-full space-y-6"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center">
          <UserPlus className="mx-auto text-white w-12 h-12 mb-2" />
          <h2 className="text-3xl font-bold text-white">Create an Account</h2>
          <p className="text-gray-300">Join us and start managing tasks!</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="w-full rounded-lg p-3 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full rounded-lg p-3 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full rounded-lg p-3 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Country</label>
            <input
              type="text"
              name="country"
              className="w-full rounded-lg p-3 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Your Country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 p-3 rounded-lg text-white font-semibold shadow-lg transition-all"
          >
            Signup
          </motion.button>
        </form>

        <p className="text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-400 hover:text-pink-300 underline hover:underline-offset-4"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
