const mongoose = require('mongoose');

/**
 * Activity Schema
 * Tracks user interactions for the Dashboard Recent Activity feed.
 */
const ActivitySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true // Indexed for faster dashboard loading
    },
    type: {
        type: String,
        required: true,
        enum: ['document', 'quiz', 'flashcard', 'auth'], // Categorizes the action
    },
    action: {
        type: String, 
        required: true, // Example: 'Uploaded', 'Attempted', 'Generated'
    },
    targetName: {
        type: String,
        required: true, // Stores the Title of the Doc or Quiz for the display string
    },
    targetId: {
        type: mongoose.Schema.Types.ObjectId, // Link to the specific resource for the "View" button
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 2592000 // Automatically deletes logs older than 30 days to save space
    }
});

module.exports = mongoose.model('Activity', ActivitySchema);