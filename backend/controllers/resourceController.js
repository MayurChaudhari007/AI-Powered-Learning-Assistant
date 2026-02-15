const Document = require("../models/Document");
const { generateContent } = require("../utils/geminiService");
const logActivity = require("../utils/activityLogger");

// Helper to clean AI JSON responses (matching your flashcard logic)
const cleanAIJson = (text) => {
  if (!text) return "";
  return text.replace(/```json|```/g, "").trim();
};

/**
 * @desc    Get or Generate Study Resources (YT videos, Docs, Key Concepts)
 * @route   GET /api/documents/:id/resources
 */
exports.getOrGenerateResources = async (req, res, next) => {
  try {
    const { id } = req.params;

    // 1. Validate Document and check for existing data
    const document = await Document.findById(id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    // 2. Return cached resources if already analyzed
    if (document.studyResources && document.studyResources.isAnalyzed) {
      return res.json(document.studyResources);
    }

    // 3. Prepare AI Prompt for learning roadmap
    // Using extractedText to match your flashcard controller pattern
    const context = document.extractedText?.substring(0, 15000) || "";
    
    const prompt = `
      Context: ${context}
      Instruction: Act as a senior learning mentor. Analyze the text and provide a study roadmap.
      - Identify the primary technical topic.
      - Suggest 2 YouTube video search queries: one in English, one in Hindi (provide a clear "searchQuery" string).
      - Suggest 3 authoritative documentation or tutorial links (W3Schools, MDN, etc.).
      - List 5 core concepts to master.

      Format: Return ONLY a JSON object with this structure:
      {
        "topic": "Subject Name",
        "videos": [
          {"title": "Title", "searchQuery": "search query", "language": "English"},
          {"title": "Title", "searchQuery": "search query", "language": "Hindi"}
        ],
        "links": [
          {"name": "Site Name", "url": "URL", "category": "Documentation"}
        ],
        "keyConcepts": ["Concept 1", "Concept 2"]
      }
    `;

    // 4. Call AI Service
    const responseText = await generateContent(prompt);
    
    let aiData;
    try {
      aiData = JSON.parse(cleanAIJson(responseText));
    } catch (e) {
      console.error("Resource JSON Parse Error:", e);
      return res.status(500).json({ message: "AI returned invalid formatting. Please try again." });
    }

    // 5. Data Transformation (Converting search queries to YT Results URLs)
    const formattedVideos = aiData.videos.map(v => ({
      title: v.title,
      language: v.language,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(v.searchQuery)}`,
      // Dynamic YouTube placeholder thumbnail
      thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=400&h=250&auto=format&fit=crop"
    }));

    // 6. Save to Document Model
    document.studyResources = {
      topic: aiData.topic || "General Study",
      videos: formattedVideos,
      links: aiData.links,
      keyConcepts: aiData.keyConcepts,
      isAnalyzed: true
    };

    await document.save();

    // 7. Log Activity (matching your flashcard activity pattern)
    await logActivity(
      req.user.id,
      "document",
      "Generated Study Resources for",
      document.title,
      id
    );

    res.status(200).json(document.studyResources);
  } catch (err) {
    console.error("Resource Generation Error:", err);
    next(err); // Pass to your global error handler
  }
};