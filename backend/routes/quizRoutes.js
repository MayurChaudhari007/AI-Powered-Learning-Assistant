// const express = require('express');
// const router = express.Router();
// const { generateQuiz, getQuizzes, submitQuiz } = require('../controllers/quizController');
// const auth = require('../middleware/auth');

// router.post('/generate', auth, generateQuiz);
// router.get('/:documentId', auth, getQuizzes);
// router.post('/:id/submit', auth, submitQuiz);

// module.exports = router;









const express = require('express');
const router = express.Router();
const { 
    generateQuiz, 
    getQuizzes, 
    getAllUserQuizzes,
    submitQuizAttempt, 
    deleteQuiz 
} = require('../controllers/quizController');
const auth = require('../middleware/auth');

// --- Quiz Management ---

// @route   POST /api/quiz/generate
// Creates a new quiz set based on the PDF context
router.post('/generate', auth, generateQuiz);

// @route   GET /api/quiz/document/:documentId
// Fetches all quiz cards for a specific PDF
router.get('/document/:documentId', auth, getQuizzes);

router.get('/all', auth, getAllUserQuizzes);

// @route   DELETE /api/quiz/:id
// Removes a specific quiz and its attempt history
router.delete('/:id', auth, deleteQuiz);

// --- Active Testing ---

// @route   POST /api/quiz/:id/submit
// Saves a new attempt with score and detailed answers
router.post('/:id/submit', auth, submitQuizAttempt);

module.exports = router;