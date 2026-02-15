

const express = require('express');
const router = express.Router();
const { 
    uploadDocument, 
    getDocuments, 
    getDocument, 
    deleteDocument 
} = require('../controllers/documentController');
const auth = require('../middleware/auth');

const { getOrGenerateResources } = require("../controllers/resourceController");

// Destructure 'upload' from our config
const { upload } = require('../config/multer');

// --- Routes ---

// @route   POST /api/documents/upload
// @desc    Upload PDF, stream to Cloudinary, and extract text
router.post('/upload', auth, upload.single('file'), uploadDocument);

// @route   GET /api/documents
// @desc    Get all documents belonging to the logged-in user
router.get('/', auth, getDocuments);

// @route   GET /api/documents/:id
// @desc    Get a specific document's details and extracted text
router.get('/:id', auth, getDocument);
router.get("/:id/resources", auth, getOrGenerateResources);
// @route   DELETE /api/documents/:id
// @desc    Delete document from MongoDB and Cloudinary storage
router.delete('/:id', auth, deleteDocument);

module.exports = router;