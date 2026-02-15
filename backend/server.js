
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
const aiRoutes = require("./routes/aiRoutes"); 
const flashcardRoutes = require("./routes/flashcardRoutes");
const quizRoutes = require("./routes/quizRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
// const resourceRoutes = require("./routes/resourceRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

// Database Connection
connectDB();

// --- Middleware ---

// 1. Manual CORS & Preflight Handling (Fixes PathError and Browser CORS blocking)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = ["http://localhost:5173", process.env.FRONTEND_URL];
  
  // Dynamic check for local development, production, and Vercel subdomains
  if (origin && (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app"))) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Immediate response for OPTIONS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

// 2. Standard Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan("dev"));

// 3. Security Headers - Optimized for Cloudinary
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

// --- Routes ---
app.get("/", (req, res) => {
  res.json({ status: "API is running", version: "1.0.1" });
});

app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/ai", aiRoutes); 
app.use("/api/flashcards", flashcardRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/resources", resourceRoutes);

// --- Error Handling ---
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// --- Server Initialization ---
// Create server instance only in local development to avoid Vercel conflicts
if (process.env.NODE_ENV !== "production") {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
  server.timeout = 600000;
}

// Export for Vercel
module.exports = app;