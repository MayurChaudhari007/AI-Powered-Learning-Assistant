const mongoose = require('mongoose');

const ConceptSchema = new mongoose.Schema({
    // Link the explanation to the user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Link the explanation to the specific document
    document: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document',
        required: true
    },
    // The topic or term the user searched for
    term: {
        type: String,
        required: true,
        trim: true
    },
    // The 4-5 line AI-generated explanation
    explanation: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Indexing for faster retrieval of history for a specific document
ConceptSchema.index({ document: 1, user: 1 });

module.exports = mongoose.model('Concept', ConceptSchema);