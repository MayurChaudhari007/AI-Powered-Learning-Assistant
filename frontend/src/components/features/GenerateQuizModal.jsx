import React, { useState } from "react";
import { FaTimes, FaSpinner, FaRocket } from "react-icons/fa";
import api from "../../api/axios";

const GenerateQuizModal = ({ isOpen, onClose, documentId, onGenerated }) => {
  const [numQuestions, setNumQuestions] = useState(5);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    try {
      await api.post("/quiz/generate", {
        documentId,
        numberOfQuestions: numQuestions,
      });
      onGenerated(); // Refresh the list
      onClose(); // Close modal
    } catch (error) {
      console.error("Quiz generation failed:", error);
      alert("Error generating quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-white rounded-4xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-gray-900 uppercase">
              Generate New Quiz
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <FaTimes />
            </button>
          </div>

          <div className="space-y-4">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Number of Questions (5 - 20)
            </label>
            <input
              type="number"
              min="5"
              max="20"
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
            />
            <p className="text-[9px] text-gray-400 font-bold uppercase italic">
              AI will analyze the document to create unique MCQs.
            </p>
          </div>
        </div>

        <div className="p-6 bg-gray-50 flex gap-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-4 bg-white border border-gray-200 text-gray-500 text-xs font-black uppercase rounded-2xl hover:bg-gray-100 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={loading || numQuestions < 5 || numQuestions > 20}
            className="flex-1 py-4 bg-emerald-600 text-white text-xs font-black uppercase rounded-2xl hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <FaSpinner className="animate-spin" /> : <FaRocket />}
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateQuizModal;
