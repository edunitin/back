const Book = require('../models/Book');
const Quiz = require('../models/Quiz');

// Admin can upload a book
exports.uploadBook = async (req, res) => {
    try {
        const { title, author, file } = req.body;
        const newBook = new Book({ title, author, file });
        await newBook.save();
        res.status(201).json({ message: 'Book uploaded successfully', newBook });
    } catch (err) {
        res.status(500).json({ message: 'Error uploading book', error: err });
    }
};

// Admin can remove a book
exports.removeBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book removed successfully', deletedBook });
    } catch (err) {
        res.status(500).json({ message: 'Error removing book', error: err });
    }
};

// Admin can upload a quiz
exports.uploadQuiz = async (req, res) => {
    try {
        const { title, questions } = req.body;
        const newQuiz = new Quiz({ title, questions });
        await newQuiz.save();
        res.status(201).json({ message: 'Quiz uploaded successfully', newQuiz });
    } catch (err) {
        res.status(500).json({ message: 'Error uploading quiz', error: err });
    }
};

// Admin can remove a quiz
exports.removeQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedQuiz = await Quiz.findByIdAndDelete(id);
        if (!deletedQuiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(200).json({ message: 'Quiz removed successfully', deletedQuiz });
    } catch (err) {
        res.status(500).json({ message: 'Error removing quiz', error: err });
    }
};
