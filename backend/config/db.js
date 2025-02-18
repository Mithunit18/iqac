// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);  // Removed useUnifiedTopology
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn.connection.db; // Returning the db connection object for further use
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Ensure the process exits if the DB connection fails
  }
}

module.exports = connectDB;
