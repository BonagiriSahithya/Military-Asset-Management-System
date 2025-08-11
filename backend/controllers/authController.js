const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1000d' }
  );
};

// controllers/auth.js (or wherever your signup controller is)

const allowedRoles = ['Admin', 'Base Commander', 'Logistics Officer'];

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: 'User already exists. Please login.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'Base Commander', // fallback to default if no role sent
    });

    await user.save();

    const token = generateToken(user);

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user);

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

