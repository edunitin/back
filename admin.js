const express = require('express');
const { uploadBook, removeBook, uploadQuiz, removeQuiz } = require('../controllers/adminController');
const roleAuth = require('../middleware/roleAuth');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Admin routes with role-based access
router.post('/uploadBook', authenticate, roleAuth('admin'), uploadBook);
router.delete('/removeBook/:id', authenticate, roleAuth('admin'), removeBook);

router.post('/uploadQuiz', authenticate, roleAuth('admin'), uploadQuiz);
router.delete('/removeQuiz/:id', authenticate, roleAuth('admin'), removeQuiz);

module.exports = router;
