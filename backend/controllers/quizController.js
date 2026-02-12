const Quiz = require("../models/Quiz");
const Document = require("../models/Document");
const { generateContent } = require("../utils/geminiService");
const logActivity = require("../utils/activityLogger");

// Helper to clean AI JSON responses
const cleanAIJson = (text) => {
  if (!text) return "";
  return text.replace(/```json|```/g, "").trim();
};

/**
 * @desc    Generate a new MCQ Quiz
 * @route   POST /api/quiz/generate
 */
exports.generateQuiz = async (req, res, next) => {
  try {
    const { documentId, numberOfQuestions = 5 } = req.body;

    // 1. Validate Document
    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    // 2. Prepare AI Prompt for MCQs with Explanations
    const context = document.extractedText.substring(0, 20000);
    const prompt = `
            Context: ${context}
            Instruction: Generate ${numberOfQuestions} Multiple Choice Questions (MCQs) based on the document.
            Format: Return ONLY a JSON array of objects with this structure:
            {
                "questionText": "Question here",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correctAnswer": "Exact text of correct option",
                "explanation": "A 2-line explanation of why this answer is correct"
            }
            No markdown formatting, no code blocks. Just the raw JSON array.
        `;

    // 3. Call AI Service
    const responseText = await generateContent(prompt);

    let quizData;
    try {
      quizData = JSON.parse(cleanAIJson(responseText));
    } catch (e) {
      console.error("JSON Parse Error:", e);
      return res
        .status(500)
        .json({ message: "AI returned invalid formatting. Please try again." });
    }

    // 4. Save as a New Quiz Instance
    const newQuiz = await Quiz.create({
      user: req.user.id,
      document: documentId,
      title: `Quiz - ${new Date().toLocaleDateString()}`,
      questions: quizData,
    });
    // LOG ACTION: Quiz Generation
    await logActivity(
      req.user.id,
      "quiz",
      "Generated",
      document.title,
      newQuiz._id,
    );

    res.status(201).json(newQuiz);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Submit a Quiz Attempt (Handles score and detailed answers)
 * @route   POST /api/quiz/:id/submit
 */
exports.submitQuizAttempt = async (req, res, next) => {
  try {
    const { userAnswers, score, correctCount, incorrectCount } = req.body;

    const quiz = await Quiz.findOne({ _id: req.params.id, user: req.user.id });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // Add the new attempt to the history
    quiz.attempts.push({
      score,
      correctCount,
      incorrectCount,
      userAnswers,
      completedAt: new Date(),
    });

    await quiz.save();
    res.json(quiz);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get all Quizzes for a document
 * @route   GET /api/quiz/document/:documentId
 */
exports.getQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find({
      document: req.params.documentId,
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(quizzes);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete a specific Quiz
 * @route   DELETE /api/quiz/:id
 */
exports.deleteQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // 2. Log the activity
    // If document title exists, use it; otherwise use the quiz title
    const quizTitle = quiz.document?.title || quiz.title;
    await logActivity(req.user.id, "quiz", "Deleted Quiz for", quizTitle);

    res.json({ message: "Quiz deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Add this new function to your existing quiz controller
exports.getAllUserQuizzes = async (req, res, next) => {
  try {
    // Find all quizzes for this user and pull in the document title
    const allQuizzes = await Quiz.find({ user: req.user.id })
      .populate("document", "title") // Matches the 'document' field in your schema
      .sort({ createdAt: -1 }); // Newest first

    res.json(allQuizzes);
  } catch (err) {
    console.error("Global Quiz Fetch Error:", err);
    res.status(500).json({ message: "Server error fetching quiz library" });
  }
};
