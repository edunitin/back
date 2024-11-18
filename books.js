const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); // Ensure this path is correct

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find(); // Fetch all books from the database
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
    }
});

// Add a new book
router.post('/', async (req, res) => {
    const { title, author, publishedYear, genre } = req.body;
    const newBook = new Book({ title, author, publishedYear, genre });

    try {
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(500).json({ message: 'Error saving book', error });
    }
});

module.exports = router;
