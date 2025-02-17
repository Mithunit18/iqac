// backend/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Sign-Up Function
const signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if email ends with @citchennai.net
    const emailRegex = /^[a-zA-Z0-9._%+-]+@citchennai\.net$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email domain. Only @citchennai.net is allowed' });
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ 
        message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one special character' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Save role as lowercase for consistency
    const normalizedRole = role.toLowerCase();

    // Create new user WITHOUT manual hashing
    const user = await User.create({ 
      name, 
      email, 
      password,   // Directly use plain password
      role: normalizedRole 
    });

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', user, token });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
}

const login = async (req, res) => {
  const { email, password, role } = req.body;
  console.log('Login Request:', { email, role });

  try {
    const user = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, 'i') },
      role: role.toLowerCase(),
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email, role, or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email, role, or password' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set token in an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',  // Set to true in production (for HTTPS)
      maxAge: 3600000,  // 1 hour
      sameSite: 'strict', // Prevents sending cookies with cross-site requests
      path: '/',
    });

    res.status(200).json({ message: 'Logged in successfully' });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};




module.exports = { signup, login };
