const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const path = require("path"); // Import path module
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const documentRoutes = require("./routes/documentRoutes");
const hodRoutes = require("./routes/hodRoutes"); // Import HOD routes
const facultyRoutes = require("./routes/facultyRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Connect to database
connectDB();


// Routes
app.use("/api/auth", authRoutes);
app.use("/api", documentRoutes); // Mount document routes under "/api"
app.use("/api/hod", hodRoutes); // Mount HOD routes under "/api/hod"
app.use("/api/faculty", facultyRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
