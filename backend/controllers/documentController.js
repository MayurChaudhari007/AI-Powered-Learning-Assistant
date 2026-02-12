const Document = require('../models/Document');
const Quiz = require('../models/Quiz'); // Added for cleanup
const Flashcard = require('../models/Flashcard'); // Added for cleanup
const Message = require('../models/Message'); // Added for cleanup (if applicable)
const Concept = require('../models/Concept');
const extractTextFromPDF = require('../utils/pdfParser');
const { cloudinary } = require('../config/multer');
const { generateContent } = require('../utils/geminiService');
const logActivity = require('../utils/activityLogger');

exports.uploadDocument = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // 1. Helper to stream memory buffer to Cloudinary
        const streamUpload = (buffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { 
                        folder: "ai_learning_assistant", 
                        resource_type: "auto", 
                        public_id: `${req.file.originalname.split('.')[0]}-${Date.now()}`,
                        access_mode: "public" 
                    },
                    (error, result) => {
                        if (result) resolve(result);
                        else reject(error);
                    }
                );
                stream.end(buffer);
            });
        };

        // 2. Upload to Cloudinary FIRST
        const cloudinaryResult = await streamUpload(req.file.buffer);

        // 3. Create initial database entry
        const document = new Document({
            user: req.user.id,
            title: req.body.title || req.file.originalname.replace('.pdf', ''),
            fileName: req.file.originalname,
            fileUrl: cloudinaryResult.secure_url,
            cloudinaryId: cloudinaryResult.public_id,
            fileSize: req.file.size,
            status: 'processing'
        });

        await document.save();
        // LOG ACTION: User uploaded a document
        await logActivity(req.user.id, 'document', 'Uploaded', document.title, document._id);

        // 4. Respond to frontend immediately
        res.status(201).json(document);

        // 5. Background Task: Extract text AND generate Auto-Summary
        setImmediate(async () => {
            try {
                console.log(`🔍 AI Processing (Text & Summary) started for: ${document.title}`);
                
                // A. Extract Text
                const pdfData = await extractTextFromPDF(req.file.buffer);
                const extractedText = pdfData.text || "";

                // B. Generate Auto-Summary (15-20 Bullet Points)
                let autoSummary = "";
                if (extractedText.length > 100) {
                    const summaryPrompt = `
                        Analyze the following document text and provide a comprehensive summary.
                        Constraint: Provide exactly 15 to 20 detailed bullet points.
                        Format: Use only bullet points (•). No introductory or concluding text.
                        
                        TEXT: ${extractedText.substring(0, 25000)}
                    `;
                    autoSummary = await generateContent(summaryPrompt);
                }
                
                // C. Update Document with all AI data
                await Document.findByIdAndUpdate(document._id, {
                    extractedText: extractedText,
                    autoSummary: autoSummary, // Saved for instant viewing later
                    pageCount: pdfData.numpages || 0,
                    status: 'completed'
                });

                console.log(`✅ AI processing & Auto-Summary saved for: ${document.title}`);
            } catch (bgError) {
                console.error("❌ Background AI Processing Failure:", bgError.message);
                await Document.findByIdAndUpdate(document._id, { status: 'failed' });
            }
        });

    } catch (err) {
        console.error("Critical Upload Error:", err.message);
        res.status(500).json({ 
            message: 'Failed to initiate document upload', 
            error: err.message 
        });
    }
};
// @desc    Get single document with counts
exports.getDocument = async (req, res, next) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) return res.status(404).json({ message: 'Document not found' });

        if (document.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // LOG ACTION: User accessed a document
        // This makes the document appear in "Recent Activity" when opened
        await logActivity(req.user.id, 'document', 'Accessed', document.title, document._id);

        // Run counts in parallel for the single document
        const [quizCount, flashcardCount] = await Promise.all([
            Quiz.countDocuments({ document: document._id }),
            Flashcard.countDocuments({ document: document._id })
        ]);

        // Merge counts into the response
        res.json({
            ...document._doc,
            quizCount,
            flashcardCount
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all documents for the logged-in user with counts
exports.getDocuments = async (req, res, next) => {
    try {
        const documents = await Document.find({ user: req.user.id }).sort({ createdAt: -1 });

        // Process all documents to add counts
        const documentsWithCounts = await Promise.all(
            documents.map(async (doc) => {
                const [quizCount, flashcardCount] = await Promise.all([
                    Quiz.countDocuments({ document: doc._id }),
                    Flashcard.countDocuments({ document: doc._id })
                ]);

                return {
                    ...doc._doc, // Access the raw document data
                    quizCount,
                    flashcardCount
                };
            })
        );

        res.json(documentsWithCounts);
    } catch (err) {
        console.error("Error fetching documents with counts:", err.message);
        next(err);
    }
};

// @desc    Delete document from DB and Cloudinary
exports.deleteDocument = async (req, res, next) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) return res.status(404).json({ message: 'Document not found' });

        if (document.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // LOG ACTION: User deleted a document
        await logActivity(req.user.id, 'document', 'Deleted', document.title);

        
        console.log(`🧹 Starting cascade delete for document: ${document.title}`);
        const cloudinaryDelete = await cloudinary.uploader.destroy(document.cloudinaryId, { 
            resource_type: 'raw',
            invalidate: true // Tells Cloudinary to clear CDN cache
        });

        console.log("Cloudinary Delete Result:", cloudinaryDelete);
        // Parallel Cleanup of ALL related data
        await Promise.all([
            Quiz.deleteMany({ document: document._id }),
            Flashcard.deleteMany({ document: document._id }),
            Message.deleteMany({ document: document._id }),
            Concept.deleteMany({ document: document._id }),
            
            // cloudinary.uploader.destroy(document.cloudinaryId, { resource_type: 'raw' })
        ]);

        // Delete the parent document (this takes the autoSummary with it)
        await document.deleteOne();

        res.json({ message: 'Document and all associated data purged successfully' });
    } catch (err) {
        next(err);
    }
};