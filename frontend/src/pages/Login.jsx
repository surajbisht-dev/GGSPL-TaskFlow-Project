import { useState } from "react";
import { LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      if (res && res.data && res.data.token) {
        console.log(res.data);
        login(res.data.token);
      } else {
        alert("Login failed: Invalid response from server");
      }
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 p-6">
      <motion.div
        className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md w-full space-y-6"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center">
          <LogIn className="mx-auto text-white w-12 h-12 mb-2" />
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-300">Login to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              className="w-full rounded-lg p-3 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              className="w-full rounded-lg p-3 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 p-3 rounded-lg text-white font-semibold shadow-lg transition-all"
          >
            Login
          </motion.button>
        </form>

        <p className="text-center text-gray-400 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-400 hover:text-blue-300 underline hover:underline-offset-4"
          >
            Signup
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
