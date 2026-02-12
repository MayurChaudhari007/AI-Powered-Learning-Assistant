
const express = require('express');
const router = express.Router();
const { 
    chatWithPDF, 
    getChatHistory, 
    clearChatHistory, 
    generateSummary, 
    explainConcept,
    getConceptHistory, // <--- 1. Add this import
    
} = require('../controllers/aiController');
const auth = require('../middleware/auth');

// --- AI Chat & History ---
router.post('/chat', auth, chatWithPDF);
router.get('/chat/:documentId', auth, getChatHistory);
router.delete('/chat/:documentId', auth, clearChatHistory);

// --- AI Actions ---
router.post('/summary', auth, generateSummary);
router.post('/explain', auth, explainConcept);

// --- NEW: Concept History ---
// This route retrieves all persistent explanations for a document
router.get('/concepts/:documentId', auth, getConceptHistory); // <--- 2. Add this route

// --- Study Tools ---



module.exports = router;