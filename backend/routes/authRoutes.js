
const express = require('express');
const router = express.Router();
const { 
    register, 
    login, 
    getMe, 
    updateProfile, 
    deleteProfile 
} = require('../controllers/authController'); 
const auth = require('../middleware/auth');

/**
 * @description Authentication & Profile Management Routes
 * @access      Public & Private
 */

// --- 1. Public Authentication Routes ---
// @route   POST /api/auth/register
router.post('/register', register);

// @route   POST /api/auth/login
router.post('/login', login);


// --- 2. Private User Routes (Requires JWT Auth) ---
// All routes below this line require the 'auth' middleware

// @route   GET /api/auth/me
// @desc    Get current user details (excludes password)
router.get('/me', auth, getMe);

// --- 3. Profile & Account Management ---

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user identity (Name) or security (Password)
 * @access  Private
 */
router.put('/profile', auth, updateProfile);

/**
 * @route   DELETE /api/auth/profile
 * @desc    Permanently delete account and all associated cloud/DB data
 * @access  Private
 */
router.delete('/profile', auth, deleteProfile);

module.exports = router;