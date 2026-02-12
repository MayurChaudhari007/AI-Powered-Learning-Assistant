const Flashcard = require("../models/Flashcard");
const Document = require("../models/Document");
const { generateContent } = require("../utils/geminiService");
const logActivity = require("../utils/activityLogger");

// Helper to clean AI JSON responses
const cleanAIJson = (text) => {
  if (!text) return "";
  return text.replace(/```json|```/g, "").trim();
};

/**
 * @desc    Generate a new set of 10 Flashcards
 * @route   POST /api/flashcards/generate
 */
exports.generateFlashcards = async (req, res, next) => {
  try {
    const { documentId, title } = req.body;

    // 1. Validate Document
    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    // 2. Prepare AI Prompt
    const context = document.extractedText.substring(0, 20000);
    const prompt = `
            Context: ${context}
            Instruction: Generate 10 high-quality study flashcards based on the document.
            Format: Return ONLY a JSON array of objects with "question" and "answer" keys.
            No conversational text, just the array.
        `;

    // 3. Call AI Service with Retry Logic
    const responseText = await generateContent(prompt);

    let flashcardsData;
    try {
      flashcardsData = JSON.parse(cleanAIJson(responseText));
    } catch (e) {
      console.error("JSON Parse Error:", e);
      return res
        .status(500)
        .json({ message: "AI returned invalid formatting. Please try again." });
    }

    // 4. Save as a New Flashcard Set
    const newSet = await Flashcard.create({
      user: req.user.id,
      document: documentId,
      title: title || `Revision Set - ${new Date().toLocaleDateString()}`,
      cards: flashcardsData,
    });
    // Example: "Generated Flashcards for [Document Title]"
    await logActivity(
      req.user.id,
      "flashcard",
      "Generated Flashcards for",
      document.title,
      documentId,
    );
    res.status(201).json(newSet);
  } catch (err) {
    console.error("Flashcard Generation Error:", err);
    next(err);
  }
};

/**
 * @desc    Get all Flashcard Sets for a specific document
 * @route   GET /api/flashcards/document/:documentId
 */
exports.getFlashcardSets = async (req, res, next) => {
  try {
    const sets = await Flashcard.find({
      document: req.params.documentId,
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(sets);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete a specific Flashcard Set
 * @route   DELETE /api/flashcards/:id
 */
exports.deleteFlashcardSet = async (req, res, next) => {
  try {
    const set = await Flashcard.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id, // Ensure user owns the set
    });

    if (!set) {
      return res
        .status(404)
        .json({ message: "Flashcard set not found or unauthorized" });
    }
    // LOG ACTION: Deleted Flashcard Set
    // Use the title from the populated document or the set title
    const displayTitle = set.document?.title || set.title || "Flashcard Set";

    
    await logActivity(
      req.user.id,
      "flashcard",
      "Deleted Flashcards for",
      displayTitle,
    );
    res.json({ message: "Flashcard set deleted successfully" });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get all user flashcards for Global Library
 * @route   GET /api/flashcards/all
 */
exports.getAllUserFlashcards = async (req, res, next) => {
  try {
    // 2. Use 'Flashcard' (the variable defined above)
    // 3. Use 'document' (to match the field name in your Flashcard.js schema)
    const allSets = await Flashcard.find({ user: req.user.id })
      .populate("document", "title")
      .sort({ createdAt: -1 });

    res.json(allSets);
  } catch (err) {
    console.error("Global Flashcard Fetch Error:", err);
    res.status(500).json({
      message: "Server Error fetching library",
      error: err.message,
    });
  }
};
