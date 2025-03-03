// backend/routes/auth.route.js
const express = require('express');
const { signup, login } = require('../controllers/auth.controller');

const router = express.Router();

// Signup Route
router.post('/signup', signup);

// Login Route
router.post('/login', login);

module.exports = router;
