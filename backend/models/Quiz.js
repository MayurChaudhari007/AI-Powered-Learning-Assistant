// const mongoose = require('mongoose');

// const QuizSchema = new mongoose.Schema({
//     documentId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Document',
//         required: true
//     },
//     questions: [{
//         question: String,
//         options: [String],
//         correctAnswer: String,
//         explanation: String
//     }],
//     score: {
//         type: Number,
//         default: 0
//     },
//     attempts: {
//         type: Number,
//         default: 0
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// module.exports = mongoose.model('Quiz', QuizSchema);




const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    // Link to the user who created it for security
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Link to the source PDF
    document: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document',
        required: true
    },
    // Allows multiple quizzes like "Quiz #1", "Final Prep", etc.
    title: {
        type: String,
        required: true,
        trim: true,
        default: "New Quiz"
    },
    // The AI-generated MCQ structure
    questions: [{
        questionText: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: String, required: true },
        explanation: { type: String, required: true } // AI-generated 2-line reasoning
    }],
    // Stores history for "View Results" and "Retest" features
    attempts: [{
        score: { type: Number, required: true }, // e.g., 80 for 80%
        correctCount: { type: Number, required: true },
        incorrectCount: { type: Number, required: true },
        // Stores what the user picked for detailed review
        userAnswers: [{
            questionId: mongoose.Schema.Types.ObjectId,
            selectedOption: String
        }],
        completedAt: { type: Date, default: Date.now }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Optimization: Indexing for fast retrieval in the document workspace
QuizSchema.index({ document: 1, user: 1 });

module.exports = mongoose.model('Quiz', QuizSchema);