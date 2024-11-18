const express = require('express');
const User = require('../models/User'); // Import User model
const router = express.Router();

// Route to create a new user
router.post('/create', async (req, res) => {
  try {
    const { username, email } = req.body;

    // Create a new user
    const newUser = new User({
      username,
      email,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', newUser });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
});

module.exports = router;
