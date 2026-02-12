const express = require('express');
const router = express.Router();
const { 
    generateFlashcards, 
    getFlashcardSets, 
    getAllUserFlashcards,
    deleteFlashcardSet 
} = require('../controllers/flashcardController');
const auth = require('../middleware/auth');

// POST /api/flashcards/generate - Creates a new set
router.post('/generate', auth, generateFlashcards);

// GET /api/flashcards/document/:documentId - Gets all sets for a PDF
router.get('/document/:documentId', auth, getFlashcardSets);

// --- Global Library Route ---
// @route   GET /api/flashcards/all
router.get('/all', auth, getAllUserFlashcards);

// DELETE /api/flashcards/:id - Deletes a specific set
router.delete('/:id', auth, deleteFlashcardSet);

module.exports = router;