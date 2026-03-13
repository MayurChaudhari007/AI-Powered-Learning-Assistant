
// import React, { useState } from "react";
// import {
//   FaChevronLeft,
//   FaChevronRight,
//   FaTimes,
//   FaUndo,
//   FaEye,
//   FaQuestionCircle,
// } from "react-icons/fa";

// const FlashcardViewer = ({ set, onBack }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isFlipped, setIsFlipped] = useState(false);

//   // Error handling: if set or cards data is missing
//   if (!set || !set.cards || set.cards.length === 0) {
//     return (
//       <div className="fixed inset-0 z-100 flex items-center justify-center bg-gray-900/90 backdrop-blur-sm p-4">
//         <div className="bg-white p-8 rounded-3xl text-center shadow-2xl max-w-sm">
//           <p className="font-black text-gray-800 uppercase tracking-tight">
//             No flashcards found.
//           </p>
//           <button
//             onClick={onBack}
//             className="mt-6 w-full px-6 py-3 bg-emerald-600 text-white text-[10px] font-black uppercase rounded-xl shadow-lg shadow-emerald-100"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const currentCard = set.cards[currentIndex];

//   const handleNext = () => {
//     if (currentIndex < set.cards.length - 1) {
//       setIsFlipped(false);
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setIsFlipped(false);
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-100 flex items-center justify-center p-3 md:p-4">
//       {/* Overlay Backdrop */}
//       <div
//         className="absolute inset-0 bg-gray-900/85 backdrop-blur-md"
//         onClick={onBack}
//       />

//       {/* Main Modal Container */}
//       <div className="relative w-full max-w-2xl bg-white rounded-4xl md:rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20 max-h-[90vh]">
        
//         {/* Header Section - Condensed for mobile */}
//         <div className="px-5 py-3 md:px-6 md:py-4 border-b border-gray-50 flex items-center justify-between bg-white">
//           <button
//             onClick={onBack}
//             className="flex items-center gap-2 text-[9px] md:text-[10px] font-black text-gray-400 uppercase hover:text-red-500 transition-all active:scale-95 shrink-0"
//           >
//             <FaTimes size={14} /> <span className=" xs:inline">Close</span>
//           </button>
//           <div className="text-center min-w-0 px-2">
//             <h2 className="text-[10px] md:text-sm font-black text-gray-900 uppercase tracking-tight truncate">
//               {set.title}
//             </h2>
//             <p className="text-[8px] md:text-[9px] font-bold text-emerald-500 uppercase tracking-widest mt-0.5">
//               Active Recall Mode
//             </p>
//           </div>
//           <div className="w-10 md:w-16 flex justify-end">
//              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
//           </div>
//         </div>

//         {/* The Card Display */}
//         <div className="p-4 md:p-6 flex flex-col items-center flex-1 overflow-y-auto">
//           <div
//             onClick={() => setIsFlipped(!isFlipped)}
//             className={`w-full min-h-70 md:min-h-87.5 p-6 md:p-10 rounded-4xl md:rounded-4xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-500 shadow-xl border-2 ${
//               isFlipped
//                 ? "bg-emerald-600 border-emerald-500 text-white shadow-emerald-100"
//                 : "bg-white border-gray-100 text-gray-800 hover:border-emerald-100"
//             }`}
//           >
//             {/* Type Indicator */}
//             <div
//               className={`mb-6 md:mb-8 flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
//                 isFlipped
//                   ? "bg-emerald-700/50 text-emerald-100"
//                   : "bg-gray-50 text-gray-400"
//               }`}
//             >
//               {isFlipped ? <FaEye size={10} /> : <FaQuestionCircle size={10} />}
//               {isFlipped ? "Answer" : "Question"}
//             </div>

//             {/* Responsive Text Content */}
//             <h3
//               className={`text-base md:text-2xl font-bold leading-relaxed px-2 md:px-4 ${
//                 isFlipped ? "text-white" : "italic text-gray-700"
//               }`}
//             >
//               {isFlipped ? currentCard.answer : `"${currentCard.question}"`}
//             </h3>

//             {/* Interaction Prompt */}
//             <div
//               className={`mt-6 md:mt-10 flex items-center gap-2 text-[8px] md:text-[10px] font-black uppercase tracking-wider ${
//                 isFlipped ? "text-emerald-200/80" : "text-emerald-500"
//               }`}
//             >
//               <FaUndo size={10} className={isFlipped ? "" : "animate-pulse"} />
//               {isFlipped ? "Click to flip back" : "Tap to reveal answer"}
//             </div>
//           </div>
//         </div>

//         {/* Footer Navigation - Improved Mobile Controls */}
//         <div className="px-4 py-4 md:px-8 md:py-6 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between gap-3">
//           <button
//             onClick={handlePrev}
//             disabled={currentIndex === 0}
//             className="flex-1 sm:flex-none py-3 px-4 md:px-6 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-emerald-600 hover:border-emerald-200 disabled:opacity-20 shadow-sm transition-all active:scale-90 flex items-center justify-center gap-2 text-[10px] font-black uppercase"
//           >
//             <FaChevronLeft size={10} />
//             <span className="hidden sm:inline tracking-widest">Prev</span>
//           </button>

//           <div className="flex-1 sm:flex-none py-3 px-4 md:px-8 bg-gray-900 rounded-xl text-white font-black text-xs shadow-lg shadow-gray-200 text-center flex items-center justify-center gap-1.5 min-w-20">
//             {currentIndex + 1} <span className="text-gray-500">/</span> {set.cards.length}
//           </div>

//           <button
//             onClick={handleNext}
//             disabled={currentIndex === set.cards.length - 1}
//             className="flex-1 sm:flex-none py-3 px-4 md:px-6 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-emerald-600 hover:border-emerald-200 disabled:opacity-20 shadow-sm transition-all active:scale-90 flex items-center justify-center gap-2 text-[10px] font-black uppercase"
//           >
//             <span className="hidden sm:inline tracking-widest">Next</span>
//             <FaChevronRight size={10} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FlashcardViewer;


import React, { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaUndo,
  FaEye,
  FaQuestionCircle,
} from "react-icons/fa";
import { useDrag } from '@use-gesture/react';

const FlashcardViewer = ({ set, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset flip state when card changes
  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex]);

  // Error handling: if set or cards data is missing
  if (!set || !set.cards || set.cards.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/90 backdrop-blur-sm p-4">
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
  const progressPercentage = ((currentIndex + 1) / set.cards.length) * 100;

  const handleNext = () => {
    if (currentIndex < set.cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Swipe gesture handling for mobile
  const bindSwipe = useDrag(({ movement: [mx], direction: [xDir], distance: [dist], swipe: [sx] }) => {
    // Only trigger if the swipe was significant enough
    if (dist > 50 && sx !== 0) {
      if (xDir === -1) {
        handleNext(); // Swipe left -> Next
      } else if (xDir === 1) {
        handlePrev(); // Swipe right -> Prev
      }
    }
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 font-sans">
      {/* Overlay Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"
        onClick={onBack}
      />

      {/* Main Modal Container */}
      <div className="relative w-full max-w-3xl bg-gray-50 rounded-4xl md:rounded-[3rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh]">
        
        {/* Animated Progress Bar */}
        <div className="absolute top-0 left-0 h-1.5 bg-emerald-100 w-full z-10">
            <div 
                className="h-full bg-emerald-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
            />
        </div>

        {/* Header Section */}
        <div className="px-5 py-4 md:px-8 md:py-6 bg-white flex items-center justify-between border-b border-gray-100 z-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase hover:text-red-500 transition-colors active:scale-95 shrink-0"
          >
            <FaTimes size={18} /> <span className="hidden xs:inline tracking-wider">Close</span>
          </button>
          
          <div className="text-center min-w-0 px-4">
            <h2 className="text-xs md:text-sm font-black text-gray-900 uppercase tracking-tight truncate">
              {set.title}
            </h2>
            <p className="text-[8px] md:text-[9px] font-bold text-emerald-500 uppercase tracking-widest mt-1">
              Active Recall Mode
            </p>
          </div>
          
          <div className="w-10 md:w-16 flex justify-end">
             <div className="px-3 py-1.5 bg-gray-100 rounded-full text-[10px] font-black text-gray-600 tracking-wider">
                 {currentIndex + 1} / {set.cards.length}
             </div>
          </div>
        </div>

        {/* The Card Display Area */}
        <div 
            {...bindSwipe()}
            className="p-4 md:p-12 flex flex-col items-center flex-1 overflow-y-auto perspective-[1000px] touch-pan-y"
        >
          {/* 3D Flipping Container - FIXED SIZING */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative w-full max-w-xl min-h-87.5 md:min-h-100 cursor-pointer group transition-transform duration-700 preserve-3d"
            style={{ 
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                transformStyle: 'preserve-3d'
            }}
          >
            {/* FRONT OF CARD (Question) - ADDED ANTI-BLUR */}
            <div 
              className="absolute inset-0 w-full h-full bg-white rounded-3xl md:rounded-[2.5rem] shadow-xl border-2 border-gray-100 p-6 md:p-12 flex flex-col items-center justify-center text-center backface-hidden group-hover:border-emerald-200 transition-colors"
              style={{ transform: 'translateZ(1px)', WebkitBackfaceVisibility: 'hidden' }}
            >
                
              {/* Background Icon Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                  <FaQuestionCircle size={150} />
              </div>

              <div className="mb-auto px-4 py-1.5 bg-gray-50 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400 border border-gray-100">
                Question
              </div>

              <h3 className="text-lg md:text-3xl font-bold leading-tight text-gray-800 z-10">
                "{currentCard.question}"
              </h3>

              <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-emerald-500">
                <FaUndo size={12} className="animate-bounce" />
                Tap to reveal answer
              </div>
            </div>

            {/* BACK OF CARD (Answer) - ADDED ANTI-BLUR */}
            <div 
                className="absolute inset-0 w-full h-full bg-emerald-600 rounded-3xl md:rounded-[2.5rem] shadow-2xl shadow-emerald-200 border-2 border-emerald-500 p-6 md:p-12 flex flex-col items-center justify-center text-center backface-hidden overflow-y-auto scrollbar-hide"
                style={{ transform: 'rotateY(180deg) translateZ(1px)', WebkitBackfaceVisibility: 'hidden' }}
            >
              {/* Background Icon Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none text-black">
                  <FaEye size={150} />
              </div>

              <div className="mb-auto px-4 py-1.5 bg-emerald-700/50 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-100 shrink-0">
                Answer
              </div>

              {/* Dynamic text sizing based on answer length */}
              <h3 className={`font-bold leading-relaxed text-white z-10 py-4 ${currentCard.answer.length > 150 ? 'text-base md:text-xl' : 'text-lg md:text-3xl'}`}>
                {currentCard.answer}
              </h3>

              <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-emerald-200/80 shrink-0">
                <FaUndo size={12} />
                Click to flip back
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation (Always Visible) */}
        <div className="bg-white border-t border-gray-100 p-4 md:p-6 z-10 shrink-0">
          <div className="flex items-center justify-between gap-4 max-w-xl mx-auto">
              <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="flex-1 py-4 px-6 bg-gray-50 border border-gray-100 rounded-2xl text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30 transition-all active:scale-95 flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest"
              >
                  <FaChevronLeft size={12} />
                  <span className="hidden sm:inline">Previous</span>
              </button>
              
              <button
                  onClick={handleNext}
                  disabled={currentIndex === set.cards.length - 1}
                  className="flex-1 py-4 px-6 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 disabled:opacity-30 transition-all active:scale-95 flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest"
              >
                  <span className="hidden sm:inline">Next Card</span>
                  <FaChevronRight size={12} />
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardViewer;