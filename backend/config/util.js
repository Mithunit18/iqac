const jwt = require('jsonwebtoken');

// Load environment variables
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Function to generate a JWT token
const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

module.exports = generateToken;
