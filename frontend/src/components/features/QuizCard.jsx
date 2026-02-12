
// import React from "react";
// import { FaTrash, FaPlay, FaPoll, FaRedo, FaAward } from "react-icons/fa";

// const QuizCard = ({ quiz, onStart, onDelete, onViewResults }) => {
//   // 1. Logic to determine if user has attempted the quiz
//   const hasAttempted = quiz.attempts && quiz.attempts.length > 0;

//   // 2. Get the most recent score if it exists
//   const lastScore = hasAttempted
//     ? quiz.attempts[quiz.attempts.length - 1].score
//     : 0;

//   return (
//     <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative">
//       {/* Top Header: Score Badge & Delete */}
//       <div className="flex justify-between items-start mb-6">
//         <div
//           className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
//             hasAttempted
//               ? "bg-emerald-50 text-emerald-600"
//               : "bg-gray-50 text-gray-400"
//           }`}
//         >
//           <FaAward size={12} />
//           Score: {lastScore}%
//         </div>

//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             // Pass both ID and Title for the Delete Modal context
//             onDelete(quiz._id, quiz.title);
//           }}
//           className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
//         >
//           <FaTrash size={14} />
//         </button>
//       </div>

//       {/* Quiz Info Section */}
//       <div className="space-y-2 mb-8">
//         <h4 className="text-lg font-black text-gray-900 truncate uppercase tracking-tight">
//           {quiz.title}
//         </h4>
//         <div className="flex flex-wrap items-center gap-3">
//           <span className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-black rounded-full uppercase">
//             {quiz.questions.length} Questions
//           </span>
//           <span className="text-[10px] font-bold text-gray-300 uppercase">
//             {new Date(quiz.createdAt).toLocaleDateString()}
//           </span>
//         </div>
//       </div>

//       {/* Dynamic Action Buttons based on Attempt Status */}
//       <div className="flex flex-col gap-3">
//         {!hasAttempted ? (
//           /* State 1: Fresh Quiz - User hasn't played yet */
//           <button
//             onClick={onStart}
//             className="w-full py-4 bg-emerald-600 text-white text-[10px] font-black uppercase rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 active:scale-95"
//           >
//             <FaPlay /> Start Quiz
//           </button>
//         ) : (
//           /* State 2: Attempted Quiz - Show Results and Retest */
//           <div className="flex flex-col gap-3 animate-in fade-in duration-300">
//             <button
//               onClick={() => onViewResults(quiz)}
//               className="w-full py-4 bg-gray-900 text-white text-[10px] font-black uppercase rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-lg active:scale-95"
//             >
//               <FaPoll /> View Results
//             </button>
//             <button
//               onClick={onStart}
//               className="w-full py-4 border-2 border-emerald-100 text-emerald-600 text-[10px] font-black uppercase rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-50 transition-all active:scale-95"
//             >
//               <FaRedo /> Retest Quiz
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuizCard;




import React from "react";
import { FaTrash, FaPlay, FaPoll, FaRedo, FaAward } from "react-icons/fa";

const QuizCard = ({ quiz, onStart, onDelete, onViewResults }) => {
  // 1. Logic to determine if user has attempted the quiz
  const hasAttempted = quiz.attempts && quiz.attempts.length > 0;

  // 2. Get the most recent score if it exists
  const lastScore = hasAttempted
    ? quiz.attempts[quiz.attempts.length - 1].score
    : 0;

  return (
    <div className="bg-white p-5 md:p-6 rounded-[2.5rem] md:rounded-4xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative">
      {/* Top Header: Score Badge & Delete */}
      <div className="flex justify-between items-start mb-4 md:mb-6">
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest shrink-0 ${
            hasAttempted
              ? "bg-emerald-50 text-emerald-600"
              : "bg-gray-50 text-gray-400"
          }`}
        >
          <FaAward size={10} className="md:size-3" />
          Score: {lastScore}%
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(quiz._id, quiz.title);
          }}
          className="p-2.5 md:p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90"
        >
          <FaTrash size={12} className="md:size-3.5" />
        </button>
      </div>

      {/* Quiz Info Section */}
      <div className="space-y-1 md:space-y-2 mb-6 md:mb-8">
        <h4 className="text-base md:text-lg font-black text-gray-900 truncate uppercase tracking-tight">
          {quiz.title}
        </h4>
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <span className="px-2.5 py-1 bg-gray-100 text-gray-500 text-[9px] md:text-[10px] font-black rounded-full uppercase">
            {quiz.questions.length} Questions
          </span>
          <span className="text-[9px] md:text-[10px] font-bold text-gray-400 md:text-gray-300 uppercase">
            {new Date(quiz.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Dynamic Action Buttons */}
      <div className="flex flex-col gap-2 md:gap-3">
        {!hasAttempted ? (
          /* State 1: Fresh Quiz */
          <button
            onClick={onStart}
            className="w-full py-3.5 md:py-4 bg-emerald-600 text-white text-[9px] md:text-[10px] font-black uppercase rounded-xl md:rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 active:scale-95"
          >
            <FaPlay size={10} /> Start Quiz
          </button>
        ) : (
          /* State 2: Attempted Quiz */
          <div className="flex flex-col gap-2 md:gap-3 animate-in fade-in duration-300">
            <button
              onClick={() => onViewResults(quiz)}
              className="w-full py-3.5 md:py-4 bg-gray-900 text-white text-[9px] md:text-[10px] font-black uppercase rounded-xl md:rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-lg active:scale-95"
            >
              <FaPoll size={12} /> View Results
            </button>
            <button
              onClick={onStart}
              className="w-full py-3 md:py-4 border-2 border-emerald-100 text-emerald-600 text-[9px] md:text-[10px] font-black uppercase rounded-xl md:rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-50 transition-all active:scale-95"
            >
              <FaRedo size={10} /> Retest Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizCard;