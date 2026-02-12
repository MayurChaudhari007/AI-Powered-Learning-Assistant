const express = require('express');
const router = express.Router();

// 1. Controller Import: Make sure to use curly braces { }
const { getDashboardStats } = require('../controllers/dashboardController');

// 2. Middleware Import: Based on your setup
const auth = require('../middleware/auth'); 

/**
 * @route   GET /api/dashboard/stats
 * @desc    Get dashboard counts and recent activity
 * @access  Private
 */
// Use 'auth' here because that is what you named the requirement above
router.get('/stats', auth, getDashboardStats);

module.exports = router;