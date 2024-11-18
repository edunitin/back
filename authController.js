const User = require('../models/user'); // Ensure this path is correct
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registration logic
exports.register = async (req, res) => {
  const { username, password } = req.body;

  // Check if the username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Create and save new user with hashed password
  const user = new User({ username, password });

  try {
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err });
  }
};

// Login logic
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Compare the entered password with the hashed password in DB
  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (isPasswordCorrect) {
    // Create JWT token if passwords match
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      message: 'Login successful',
      token: token,
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
