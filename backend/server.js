const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// Import Consolidated Routes
const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");
const aiRoutes = require("./routes/aiRoutes"); // This now handles Chat, Summary,
const flashcardRoutes = require("./routes/flashcardRoutes");
const quizRoutes = require("./routes/quizRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

// Database Connection
connectDB();

// --- Middleware ---

// 1. Increased payload limits for large PDF text extraction
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// 2. CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// 3. Security Headers - Optimized for Cloudinary asset delivery
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

app.use(morgan("dev"));

// --- Routes ---

app.get("/", (req, res) => {
  res.json({ status: "API is running", version: "1.0.0" });
});

app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/ai", aiRoutes); // Use this single mount point for all AI logic
app.use("/api/flashcards", flashcardRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/dashboard", dashboardRoutes);

// --- Error Handling ---
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});
// --- Server Initialization ---

// Create server instance to set long timeouts for heavy PDF processing
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 Local: http://localhost:${PORT}`);
});

/**
 * 10-Minute Timeout (600,000 ms)
 * Necessary for Gemini processing and large file uploads.
 */
server.timeout = 600000;
