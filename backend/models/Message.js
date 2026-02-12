const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    document: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'model'], // Gemini uses 'model' for AI responses
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Indexing for fast retrieval of specific document conversations
MessageSchema.index({ document: 1, user: 1, createdAt: 1 });

module.exports = mongoose.model('Message', MessageSchema);