const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // <-- corrected import here
require('dotenv').config();

const router = express.Router();

// REGISTER (SIGNUP)
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role = 'user', baseId } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      username,
      email,
      password: hashedPassword,
      role
    };

    if (User.rawAttributes.baseId) {
      userData.baseId = baseId || null;
    }

    const newUser = await User.create(userData);

    return res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({
      message: 'Error creating user',
      error: err.message
    });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'User does not exist' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET missing in .env");
      return res.status(500).json({ message: 'JWT_SECRET is not set' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, baseId: user.baseId || null },
      process.env.JWT_SECRET,
      { expiresIn: '100h' }
    );

    return res.json({ token, role: user.role });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

module.exports = router;
