import React from "react";
import {
  FaTrophy,
  FaTrash,
  FaPlay,
  FaPoll,
  FaRegFileAlt,
  FaCalendarAlt,
  FaChartLine,
} from "react-icons/fa";

const GlobalQuizCard = ({ quiz, onStart, onViewResults, onDelete }) => {
  // 1. Identify parent document name
  const docTitle = quiz.document?.title || "Untitled Document";

  // 2. Logic to determine attempt status and latest score
  const hasAttempted = quiz.attempts && quiz.attempts.length > 0;
  const lastScore = hasAttempted
    ? quiz.attempts[quiz.attempts.length - 1].score
    : 0;

  return (
    <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
      {/* Top Header: Document Badge & Delete */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-xl border border-blue-100/50">
          <FaRegFileAlt className="text-blue-500 text-[10px]" />
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-tighter truncate max-w-30">
            {docTitle}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(quiz._id, quiz.title);
          }}
          className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
        >
          <FaTrash size={12} />
        </button>
      </div>

      {/* Performance Circle (Small visual indicator) */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${
            hasAttempted
              ? lastScore >= 50
                ? "bg-emerald-50 text-emerald-500"
                : "bg-red-50 text-red-500"
              : "bg-gray-50 text-gray-300"
          }`}
        >
          <FaTrophy size={24} />
        </div>
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            Latest Score
          </p>
          <h3
            className={`text-2xl font-black ${hasAttempted ? (lastScore >= 50 ? "text-emerald-600" : "text-red-600") : "text-gray-300"}`}
          >
            {hasAttempted ? `${lastScore}%` : "N/A"}
          </h3>
        </div>
      </div>

      {/* Quiz Info */}
      <div className="space-y-2 mb-8">
        <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight truncate">
          {quiz.title}
        </h4>
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-2 py-1 bg-gray-100 text-gray-500 text-[9px] font-black rounded-md uppercase">
            {quiz.questions.length} Questions
          </span>
          <span className="flex items-center gap-1 text-[9px] font-bold text-gray-300 uppercase">
            <FaCalendarAlt size={8} />{" "}
            {new Date(quiz.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        {hasAttempted ? (
          <>
            <button
              onClick={() => onViewResults(quiz)}
              className="w-full py-3.5 bg-gray-900 text-white text-[10px] font-black uppercase rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-lg active:scale-95"
            >
              <FaPoll /> View Last Result
            </button>
            <button
              onClick={onStart}
              className="w-full py-3.5 border-2 border-emerald-100 text-emerald-600 text-[10px] font-black uppercase rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-50 transition-all active:scale-95"
            >
              <FaChartLine /> Retest Now
            </button>
          </>
        ) : (
          <button
            onClick={onStart}
            className="w-full py-4 bg-emerald-600 text-white text-[10px] font-black uppercase rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 active:scale-95"
          >
            <FaPlay size={10} /> Start Assessment
          </button>
        )}
      </div>
    </div>
  );
};

export default GlobalQuizCard;
