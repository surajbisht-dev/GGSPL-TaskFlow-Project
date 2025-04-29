import axios from "axios";

const API = axios.create({
  baseURL: "https://ggspl-taskflow-project.onrender.com",
});

// Add token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
