import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import DocumentList from "./pages/DocumentList";
import DocumentView from "./pages/DocumentView";
import FlashcardList from "./pages/FlashcardList";

import QuizList from "./pages/QuizList";

import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/documents" element={<DocumentList />} />
          <Route path="/documents/:id" element={<DocumentView />} />
          <Route path="/flashcards" element={<FlashcardList />} />

          <Route path="/quizzes" element={<QuizList />} />

          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
