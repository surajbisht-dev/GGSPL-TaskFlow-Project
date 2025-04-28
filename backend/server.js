const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

//project route
const projectRoutes = require("./routes/projectRoutes");
app.use("/api/projects", projectRoutes);

// task routes
const taskRoutes = require("./routes/taskRoutes");
app.use("/api", taskRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(error.message));
