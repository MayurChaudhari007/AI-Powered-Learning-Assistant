# AI-Powered Learning Assistant Backend

This is the backend for the AI-Powered Learning Assistant application. It provides APIs for user authentication, document management, and AI-powered features using Google Gemini.

## Features

- **Authentication**: JWT-based user registration and login.
- **Document Management**: Upload, list, and delete PDF documents. Extract text from PDFs.
- **AI Integration**: Chat with PDF content, generate summaries, and explain concepts using Google Gemini Pro.
- **Flashcards**: Auto-generate flashcards from document content.
- **Quizzes**: Auto-generate MCQ quizzes from document content.

## Prerequisites

- Node.js
- MongoDB (Atlas or local)
- Google Gemini API Key

## Installation

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure environment variables:
    - Open `.env` file.
    - Set `MONGO_URI` to your MongoDB connection string.
    - Set `JWT_SECRET` to a secure secret for token generation.
    - Set `GEMINI_API_KEY` to your Google Gemini API key.
    - Set `CLOUDINARY_*` variables (optional, mostly for future frontend image handling if needed).

## Running the Server

-   **Development Mode** (with nodemon):
    ```bash
    npm run dev
    ```

-   **Production Mode**:
    ```bash
    npm start
    ```

## API Endpoints

### Auth
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login user.
- `GET /api/auth/me`: Get current user info.

### Documents
- `POST /api/documents/upload`: Upload a PDF.
- `GET /api/documents`: List all uploaded documents.
- `GET /api/documents/:id`: Get a specific document.
- `DELETE /api/documents/:id`: Delete a document.

### AI
- `POST /api/ai/chat`: Chat with a document.
- `POST /api/ai/summary`: Generate a summary of a document.
- `POST /api/ai/explain`: Explain a concept from a document.

### Flashcards
- `POST /api/flashcards/generate`: Generate flashcards for a document.
- `GET /api/flashcards/:documentId`: Get flashcards for a document.
- `PUT /api/flashcards/:id/favorite`: Toggle favorite status.

### Quizzes
- `POST /api/quiz/generate`: Generate a quiz for a document.
- `GET /api/quiz/:documentId`: Get quizzes for a document.
- `POST /api/quiz/:id/submit`: Submit quiz results.
