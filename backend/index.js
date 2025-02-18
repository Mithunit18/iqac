// index.js
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const documentRoutes = require('./routes/documentRoutes'); // Correctly import document routes

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// Connect to database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', documentRoutes); // Mount document routes under '/api'

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
