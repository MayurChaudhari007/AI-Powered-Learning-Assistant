
import React, { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaUndo,
  FaEye,
  FaQuestionCircle,
} from "react-icons/fa";

const FlashcardViewer = ({ set, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Error handling: if set or cards data is missing
  if (!set || !set.cards || set.cards.length === 0) {
    return (
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-gray-900/90 backdrop-blur-sm p-4">
        <div className="bg-white p-8 rounded-3xl text-center shadow-2xl max-w-sm">
          <p className="font-black text-gray-800 uppercase tracking-tight">
            No flashcards found.
          </p>
          <button
            onClick={onBack}
            className="mt-6 w-full px-6 py-3 bg-emerald-600 text-white text-[10px] font-black uppercase rounded-xl shadow-lg shadow-emerald-100"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentCard = set.cards[currentIndex];

  const handleNext = () => {
    if (currentIndex < set.cards.length - 1) {
      setIsFlipped(false);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-3 md:p-4">
      {/* Overlay Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/85 backdrop-blur-md"
        onClick={onBack}
      />

      {/* Main Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-4xl md:rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20 max-h-[90vh]">
        
        {/* Header Section - Condensed for mobile */}
        <div className="px-5 py-3 md:px-6 md:py-4 border-b border-gray-50 flex items-center justify-between bg-white">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[9px] md:text-[10px] font-black text-gray-400 uppercase hover:text-red-500 transition-all active:scale-95 shrink-0"
          >
            <FaTimes size={14} /> <span className=" xs:inline">Close</span>
          </button>
          <div className="text-center min-w-0 px-2">
            <h2 className="text-[10px] md:text-sm font-black text-gray-900 uppercase tracking-tight truncate">
              {set.title}
            </h2>
            <p className="text-[8px] md:text-[9px] font-bold text-emerald-500 uppercase tracking-widest mt-0.5">
              Active Recall Mode
            </p>
          </div>
          <div className="w-10 md:w-16 flex justify-end">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* The Card Display */}
        <div className="p-4 md:p-6 flex flex-col items-center flex-1 overflow-y-auto">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className={`w-full min-h-70 md:min-h-87.5 p-6 md:p-10 rounded-4xl md:rounded-4xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-500 shadow-xl border-2 ${
              isFlipped
                ? "bg-emerald-600 border-emerald-500 text-white shadow-emerald-100"
                : "bg-white border-gray-100 text-gray-800 hover:border-emerald-100"
            }`}
          >
            {/* Type Indicator */}
            <div
              className={`mb-6 md:mb-8 flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                isFlipped
                  ? "bg-emerald-700/50 text-emerald-100"
                  : "bg-gray-50 text-gray-400"
              }`}
            >
              {isFlipped ? <FaEye size={10} /> : <FaQuestionCircle size={10} />}
              {isFlipped ? "Answer" : "Question"}
            </div>

            {/* Responsive Text Content */}
            <h3
              className={`text-base md:text-2xl font-bold leading-relaxed px-2 md:px-4 ${
                isFlipped ? "text-white" : "italic text-gray-700"
              }`}
            >
              {isFlipped ? currentCard.answer : `"${currentCard.question}"`}
            </h3>

            {/* Interaction Prompt */}
            <div
              className={`mt-6 md:mt-10 flex items-center gap-2 text-[8px] md:text-[10px] font-black uppercase tracking-wider ${
                isFlipped ? "text-emerald-200/80" : "text-emerald-500"
              }`}
            >
              <FaUndo size={10} className={isFlipped ? "" : "animate-pulse"} />
              {isFlipped ? "Click to flip back" : "Tap to reveal answer"}
            </div>
          </div>
        </div>

        {/* Footer Navigation - Improved Mobile Controls */}
        <div className="px-4 py-4 md:px-8 md:py-6 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex-1 sm:flex-none py-3 px-4 md:px-6 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-emerald-600 hover:border-emerald-200 disabled:opacity-20 shadow-sm transition-all active:scale-90 flex items-center justify-center gap-2 text-[10px] font-black uppercase"
          >
            <FaChevronLeft size={10} />
            <span className="hidden sm:inline tracking-widest">Prev</span>
          </button>

          <div className="flex-1 sm:flex-none py-3 px-4 md:px-8 bg-gray-900 rounded-xl text-white font-black text-xs shadow-lg shadow-gray-200 text-center flex items-center justify-center gap-1.5 min-w-20">
            {currentIndex + 1} <span className="text-gray-500">/</span> {set.cards.length}
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === set.cards.length - 1}
            className="flex-1 sm:flex-none py-3 px-4 md:px-6 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-emerald-600 hover:border-emerald-200 disabled:opacity-20 shadow-sm transition-all active:scale-90 flex items-center justify-center gap-2 text-[10px] font-black uppercase"
          >
            <span className="hidden sm:inline tracking-widest">Next</span>
            <FaChevronRight size={10} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardViewer;