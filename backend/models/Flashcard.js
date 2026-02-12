const mongoose = require('mongoose');

const FlashcardSchema = new mongoose.Schema({
    // Link to the user who created it
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Link to the PDF it was generated from
    document: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document',
        required: true
    },
    // Allows the user to have multiple sets like "Basics", "Advanced", etc.
    title: {
        type: String,
        required: true,
        trim: true,
        default: "New Flashcard Set"
    },
    // The actual array of 10 Q&A pairs
    cards: [
        {
            question: { type: String, required: true },
            answer: { type: String, required: true },
            isFavorite: { type: Boolean, default: false }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Indexing for faster retrieval when opening a document
FlashcardSchema.index({ document: 1, user: 1 });

module.exports = mongoose.model('Flashcard', FlashcardSchema);