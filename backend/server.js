const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes.js");
const doctorRoutes = require("./routes/doctorRoutes.js");
const appointmentRoutes = require("./routes/appointmentRoutes.js");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors()); // Enable CORS for frontend

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

const PORT = process.env.PORT || 5001;

// ✅ Start server and handle port conflicts
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// ✅ Handle "EADDRINUSE" error
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use. Trying another port...`);
    server.listen(0); // Automatically find a free port
  } else {
    console.error(`❌ Server error: ${err.message}`);
  }
});
