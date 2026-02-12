const Document = require('../models/Document');
const Quiz = require('../models/Quiz');
const Flashcard = require('../models/Flashcard');
const Activity = require('../models/Activity');

/**
 * @desc    Get All Dashboard Data (Counts + Recent Activity)
 * @route   GET /api/dashboard/stats
 * @access  Private
 */
exports.getDashboardStats = async (req, res, next) => {
    try {
        const userId = req.user.id;

        // 1. Run all counts in parallel for maximum performance
        // This ensures the dashboard loads instantly even with many files.
        const [totalDocs, totalQuizzes, totalFlashcards] = await Promise.all([
            Document.countDocuments({ user: userId }),
            Quiz.countDocuments({ user: userId }),
            Flashcard.countDocuments({ user: userId })
        ]);

        // 2. Fetch the 5 most recent activities for this specific user
        const recentActivity = await Activity.find({ user: userId })
            .sort({ createdAt: -1 }) // Newest events at the top
            .limit(5); // Keep the dashboard clean by only showing the last 5

        // 3. Send a single, structured response to the frontend
        res.json({
            success: true,
            stats: {
                totalDocs,
                totalQuizzes,
                totalFlashcards
            },
            recentActivity
        });
    } catch (err) {
        console.error("Dashboard Stats Error:", err.message);
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch dashboard data" 
        });
    }
};