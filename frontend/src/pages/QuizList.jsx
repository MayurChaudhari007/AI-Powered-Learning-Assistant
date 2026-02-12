
import React, { useEffect, useState } from "react";
import {
  FaQuestionCircle,
  FaSpinner,
  FaTrophy,
  FaPlus,
  FaSearch,
  FaHistory,
  FaFilter,
} from "react-icons/fa";
import api from "../api/axios";
import { Link } from "react-router-dom";
import GlobalQuizCard from "../components/features/GlobalQuizCard";
import QuizResultView from "../components/features/QuizResultView";
import QuizActiveModal from "../components/features/QuizActiveModal";
import DeleteConfirmModal from "../components/features/DeleteConfirmModal";

const QuizList = () => {
  // --- 1. State Management ---
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState([]); // All quizzes from all documents
  const [searchTerm, setSearchTerm] = useState("");
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [viewingResults, setViewingResults] = useState(null);

  // Modal State for Deletion
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: null,
    title: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);

  // --- 2. Data Fetching ---
  const fetchAllQuizzes = async () => {
    setLoading(true);
    try {
      // Hits the global endpoint that populates 'document'
      const response = await api.get("/quiz/all");
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching global quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllQuizzes();
  }, []);

  // --- 3. Handlers ---
  const handleDeleteClick = (id, title) => {
    setDeleteModal({ isOpen: true, id, title });
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await api.delete(`/quiz/${deleteModal.id}`);
      setQuizzes((prev) => prev.filter((q) => q._id !== deleteModal.id));
      setDeleteModal({ isOpen: false, id: null, title: "" });
    } catch (error) {
      alert("Failed to delete quiz. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // --- 4. Filter Logic ---
  const filteredQuizzes = quizzes.filter(
    (q) =>
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.document?.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 p-6 md:p-10">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-2 border border-emerald-100/50 shadow-sm">
            <FaHistory className="mr-2" /> Recently Attempted
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
            AI <span className="text-emerald-500">Assessments.</span>
          </h1>
          <p className="text-gray-400 font-bold text-sm uppercase tracking-tight">
            Manage and review all quizzes across your entire library.
          </p>
        </div>

        {/* Search & Action Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <div className="relative group w-full sm:w-80">
            <FaSearch
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-emerald-500 transition-colors"
              size={14}
            />
            <input
              type="text"
              placeholder="Search quiz or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all outline-none shadow-sm"
            />
          </div>
          <Link
            to="/documents"
            className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white text-[10px] font-black uppercase rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-lg active:scale-95"
          >
            <FaPlus /> New Test
          </Link>
        </div>
      </div>

      <div className="h-px bg-linear-to-r from-transparent via-gray-100 to-transparent" />

      {/* Main Content Area */}
      {loading ? (
        <div className="flex flex-col justify-center items-center h-96 space-y-6">
          <div className="relative">
            <FaSpinner className="animate-spin text-emerald-500 text-5xl" />
            <FaTrophy className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500 text-sm" />
          </div>
          <p className="text-gray-400 font-black tracking-[0.2em] uppercase text-[10px] animate-pulse">
            Analyzing Performance Data...
          </p>
        </div>
      ) : filteredQuizzes.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-4xl border-2 border-dashed border-gray-100 flex flex-col items-center">
          <div className="bg-emerald-50 p-12 rounded-4xl mb-8 rotate-3">
            <FaQuestionCircle className="h-16 w-16 text-emerald-500 opacity-40" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 uppercase">
            No Quizzes Found
          </h3>
          <p className="mt-3 text-gray-400 max-w-sm mx-auto font-bold uppercase text-[10px] tracking-widest leading-relaxed">
            {searchTerm
              ? "Try searching for a different keyword."
              : "Generate a quiz from a document to see it here."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
          {filteredQuizzes.map((quiz) => (
            <GlobalQuizCard
              key={quiz._id}
              quiz={quiz}
              onStart={() => setActiveQuiz(quiz)}
              onViewResults={(q) => setViewingResults(q)}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      {/* --- MODALS --- */}

      {/* 1. Historical Results Modal */}
      {viewingResults && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in slide-in-from-bottom-10 duration-500">
          <QuizResultView
            quiz={viewingResults}
            result={viewingResults.attempts[viewingResults.attempts.length - 1]}
            onBack={() => setViewingResults(null)}
            onRetest={() => {
              setActiveQuiz(viewingResults);
              setViewingResults(null);
            }}
          />
        </div>
      )}

      {/* 2. Active Test Modal */}
      {activeQuiz && (
        <QuizActiveModal
          quiz={activeQuiz}
          onClose={() => {
            setActiveQuiz(null);
            fetchAllQuizzes(); // Refresh to update latest score
          }}
        />
      )}

      {/* 3. Delete Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        title={deleteModal.title}
        isDeleting={isDeleting}
        onClose={() => setDeleteModal({ isOpen: false, id: null, title: "" })}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default QuizList;
