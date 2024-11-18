const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Import your User model
const router = express.Router();

// Route to register a new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Hash the password before saving it
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // Create a new user document with the hashed password
  const newUser = new User({
    username: username,
    password: hashedPassword,
    isAdmin: false,  // Or true, based on your requirement
  });

  // Save the new user to the database
  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving user', error: err });
  }
});

module.exports = router;  // Export the router
