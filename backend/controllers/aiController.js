// ------------------------------------------------------------------Import functions from service
const {
  generateContent,
  generateChatResponse,
} = require("../utils/geminiService");
const Document = require("../models/Document");
const Message = require("../models/Message");
const Concept = require("../models/Concept"); // NEW: Import Concept model
const logActivity = require("../utils/activityLogger");

// Helper to clean AI JSON responses
const cleanAIJson = (text) => {
  if (!text) return "";
  return text.replace(/```json|```/g, "").trim();
};

// --- 1. CHAT WITH PDF ---
exports.chatWithPDF = async (req, res, next) => {
  try {
    const { documentId, question } = req.body;
    const document = await Document.findById(documentId);

    if (!document)
      return res.status(404).json({ message: "Document not found" });

    const history = await Message.find({
      document: documentId,
      user: req.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    const historyContext = history
      .reverse()
      .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
      .join("\n");

    const response = await generateChatResponse(
      document.extractedText,
      question,
      historyContext,
    );

    await Message.create([
      {
        document: documentId,
        user: req.user.id,
        role: "user",
        content: question,
      },
      {
        document: documentId,
        user: req.user.id,
        role: "model",
        content: response,
      },
    ]);

    res.json({ answer: response });
  } catch (err) {
    next(err);
  }
};

// --- 2. CHAT HISTORY ---
exports.getChatHistory = async (req, res, next) => {
  try {
    const history = await Message.find({
      document: req.params.documentId,
      user: req.user.id,
    }).sort({ createdAt: 1 });
    res.json(history);
  } catch (err) {
    next(err);
  }
};

exports.clearChatHistory = async (req, res, next) => {
  try {
    await Message.deleteMany({
      document: req.params.documentId,
      user: req.user.id,
    });
    res.json({ message: "History cleared" });
  } catch (err) {
    next(err);
  }
};

// --- 3. DOCUMENT SUMMARY ---
exports.generateSummary = async (req, res, next) => {
  try {
    const { documentId } = req.body;
    const document = await Document.findById(documentId);

    if (!document)
      return res.status(404).json({ message: "Document not found" });

    if (document.autoSummary && document.autoSummary.trim() !== "") {
      return res.json({ summary: document.autoSummary });
    }

    const prompt = `
            Context: ${document.extractedText.substring(0, 25000)}
            Instruction: Provide a comprehensive summary consisting of exactly 15 to 20 detailed bullet points.
            Format: Use only bullet points (•). No introductory text.
        `;

    const response = await generateContent(prompt);
    document.autoSummary = response;
    await document.save();

    res.json({ summary: response });
  } catch (err) {
    next(err);
  }
};

// --- 4. EXPLAIN CONCEPT (Updated with Persistence) ---
exports.explainConcept = async (req, res, next) => {
  try {
    const { documentId, concept } = req.body;
    const document = await Document.findById(documentId);

    if (!document)
      return res.status(404).json({ message: "Document not found" });

    // 1. Check if this concept was already explained for this document
    const existingConcept = await Concept.findOne({
      document: documentId,
      user: req.user.id,
      term: { $regex: new RegExp(`^${concept}$`, "i") }, // Case-insensitive search
    });

    if (existingConcept) {
      return res.json({
        explanation: existingConcept.explanation,
        isCached: true,
      });
    }

    // 2. Generate new explanation if not in DB
    const prompt = `
            Context: ${document.extractedText.substring(0, 25000)}
            Instruction: Explain the concept "${concept}" in 4 to 5 lines based strictly on the text. 
            Keep it simplified but technical.
        `;

    const response = await generateContent(prompt);

    // 3. Save to History
    const newConcept = await Concept.create({
      user: req.user.id,
      document: documentId,
      term: concept,
      explanation: response,
    });

    // Inside your explainConcept function
    await logActivity(
      req.user.id,
      "document",
      "Explained Concept",
      conceptName,
      documentId,
    );

    res.json(newConcept);
  } catch (err) {
    next(err);
  }
};

// --- 5. GET CONCEPT HISTORY (NEW) ---
exports.getConceptHistory = async (req, res, next) => {
  try {
    const concepts = await Concept.find({
      document: req.params.documentId,
      user: req.user.id,
    }).sort({ createdAt: -1 }); // Newest first
    res.json(concepts);
  } catch (err) {
    next(err);
  }
};
