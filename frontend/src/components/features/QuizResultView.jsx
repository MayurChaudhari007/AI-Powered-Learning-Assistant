// import React from "react";
// import {
//   FaCheckCircle,
//   FaTimesCircle,
//   FaChartBar,
//   FaRedo,
//   FaArrowLeft,
//   FaInfoCircle,
//   FaTrophy,
//   FaLightbulb,
// } from "react-icons/fa";

// const QuizResultView = ({ result, quiz, onBack, onRetest }) => {
//   // result object contains: score, correctCount, incorrectCount, userAnswers array
//   const { score, correctCount, incorrectCount, userAnswers } = result;

//   return (
//     <div className="max-w-4xl mx-auto p-4 md:p-10 space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-500">
//       {/* 1. Score Summary Header (Matches your image) */}
//       <div className="bg-white rounded-4xl border border-gray-100 shadow-sm p-10 text-center relative overflow-hidden">
//         {/* Subtle Background Pattern */}
//         <div className="absolute top-0 right-0 p-10 opacity-5">
//           <FaTrophy size={120} />
//         </div>

//         <div className="relative z-10">
//           <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm shadow-emerald-100">
//             <FaTrophy size={32} />
//           </div>

//           <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
//             Your Final Score
//           </p>
//           <h2
//             className={`text-6xl font-black mb-2 ${score >= 50 ? "text-emerald-600" : "text-red-500"}`}
//           >
//             {score}%
//           </h2>
//           <p className="text-sm font-bold text-gray-500 uppercase tracking-tight italic mb-8">
//             {score >= 80
//               ? "Mastery Achieved!"
//               : score >= 50
//                 ? "Good Job! Keep practicing."
//                 : "Needs more review."}
//           </p>

//           {/* Stat Pills */}
//           <div className="flex flex-wrap items-center justify-center gap-4">
//             <div className="px-6 py-3 bg-gray-50 rounded-2xl flex items-center gap-3">
//               <FaChartBar className="text-gray-400" />
//               <span className="text-xs font-black text-gray-900 uppercase">
//                 {quiz.questions.length} Total
//               </span>
//             </div>
//             <div className="px-6 py-3 bg-emerald-50 rounded-2xl flex items-center gap-3 text-emerald-600 border border-emerald-100">
//               <FaCheckCircle />
//               <span className="text-xs font-black uppercase">
//                 {correctCount} Correct
//               </span>
//             </div>
//             <div className="px-6 py-3 bg-red-50 rounded-2xl flex items-center gap-3 text-red-500 border border-red-100">
//               <FaTimesCircle />
//               <span className="text-xs font-black uppercase">
//                 {incorrectCount} Incorrect
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 2. Action Buttons */}
//       <div className="flex flex-col sm:flex-row gap-4">
//         <button
//           onClick={onRetest}
//           className="flex-1 py-4 bg-emerald-600 text-white text-[10px] font-black uppercase rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 active:scale-95"
//         >
//           <FaRedo /> Try Again (Retest)
//         </button>
//         <button
//           onClick={onBack}
        
//           className="flex-1 py-4 bg-gray-900 text-white text-[10px] font-black uppercase rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-lg active:scale-95"
//         >
//           <FaArrowLeft /> Back to Dashboard
//         </button>
//       </div>

//       {/* 3. Detailed Review Section (Matches your image) */}
//       <div className="space-y-6">
//         <div className="flex items-center gap-3 px-2">
//           <FaInfoCircle className="text-emerald-500" />
//           <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">
//             Detailed Review
//           </h3>
//         </div>

//         {quiz.questions.map((q, qIdx) => {
//           const userAns = userAnswers.find(
//             (ua) => ua.questionId === q._id,
//           )?.selectedOption;
//           const isCorrect = userAns === q.correctAnswer;

//           return (
//             <div
//               key={q._id}
//               className="bg-white rounded-4xl border border-gray-100 p-8 shadow-sm space-y-6"
//             >
//               <div className="flex justify-between items-start">
//                 <span className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-black rounded-lg uppercase tracking-wider">
//                   Question {qIdx + 1}
//                 </span>
//                 <div
//                   className={`p-2 rounded-xl ${isCorrect ? "text-emerald-500 bg-emerald-50" : "text-red-500 bg-red-50"}`}
//                 >
//                   {isCorrect ? (
//                     <FaCheckCircle size={20} />
//                   ) : (
//                     <FaTimesCircle size={20} />
//                   )}
//                 </div>
//               </div>

//               <h4 className="text-lg font-bold text-gray-800 leading-relaxed">
//                 {q.questionText}
//               </h4>

//               <div className="grid grid-cols-1 gap-3">
//                 {q.options.map((option, oIdx) => {
//                   const isThisCorrect = option === q.correctAnswer;
//                   const isThisUserSelection = option === userAns;

//                   let borderClass = "border-gray-100";
//                   let bgClass = "bg-white";
//                   let textClass = "text-gray-600";
//                   let badge = null;

//                   if (isThisCorrect) {
//                     borderClass = "border-emerald-500";
//                     bgClass = "bg-emerald-50/50";
//                     textClass = "text-emerald-700 font-bold";
//                     badge = (
//                       <span className="text-[9px] font-black text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md uppercase ml-auto">
//                         Correct Answer
//                       </span>
//                     );
//                   }

//                   if (isThisUserSelection && !isThisCorrect) {
//                     borderClass = "border-red-500";
//                     bgClass = "bg-red-50/50";
//                     textClass = "text-red-700 font-bold";
//                     badge = (
//                       <span className="text-[9px] font-black text-white bg-red-500 px-2 py-0.5 rounded-md uppercase ml-auto">
//                         Your Answer
//                       </span>
//                     );
//                   }

//                   return (
//                     <div
//                       key={oIdx}
//                       className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${borderClass} ${bgClass}`}
//                     >
//                       <div
//                         className={`w-2 h-2 rounded-full ${isThisCorrect ? "bg-emerald-500" : isThisUserSelection ? "bg-red-500" : "bg-gray-200"}`}
//                       />
//                       <span className={`text-sm ${textClass}`}>{option}</span>
//                       {badge}
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* AI Explanation Box */}
//               <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex gap-4">
//                 <div className="text-emerald-500 mt-1">
//                   <FaLightbulb />
//                 </div>
//                 <div>
//                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
//                     Explanation
//                   </p>
//                   <p className="text-xs text-gray-600 font-medium leading-relaxed italic">
//                     {q.explanation}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <div className="flex flex-col sm:flex-row gap-4">
//         <button
//           onClick={onRetest}
//           className="flex-1 py-4 bg-emerald-600 text-white text-[10px] font-black uppercase rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 active:scale-95"
//         >
//           <FaRedo /> Try Again (Retest)
//         </button>
//         <button
//           onClick={onBack}
        
//           className="flex-1 py-4 bg-gray-900 text-white text-[10px] font-black uppercase rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-lg active:scale-95"
//         >
//           <FaArrowLeft /> Back to Dashboard
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QuizResultView;




import React from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaChartBar,
  FaRedo,
  FaArrowLeft,
  FaInfoCircle,
  FaTrophy,
  FaLightbulb,
  FaSpinner,
} from "react-icons/fa";

const QuizResultView = ({ result, quiz, onBack, onRetest }) => {
  const { score, correctCount, incorrectCount, userAnswers } = result;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-10 space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-500">
      
      {/* 1. Score Summary Header - Optimized for Mobile */}
      <div className="bg-white rounded-3xl md:rounded-4xl border border-gray-100 shadow-sm p-6 md:p-10 text-center relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute top-0 right-0 p-6 md:p-10 opacity-5">
          <FaTrophy className="text-6xl md:text-[120px]" />
        </div>

        <div className="relative z-10">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-50 text-emerald-500 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-sm shadow-emerald-100">
            <FaTrophy size={28} className="md:size-8" />
          </div>

          <p className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
            Your Final Score
          </p>
          <h2
            className={`text-5xl md:text-6xl font-black mb-1 md:mb-2 ${score >= 50 ? "text-emerald-600" : "text-red-500"}`}
          >
            {score}%
          </h2>
          <p className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-tight italic mb-6 md:mb-8">
            {score >= 80
              ? "Mastery Achieved!"
              : score >= 50
                ? "Good Job! Keep practicing."
                : "Needs more review."}
          </p>

          {/* Stat Pills - Responsive Wrap */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
            <div className="px-4 md:px-6 py-2 md:py-3 bg-gray-50 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3">
              <FaChartBar className="text-gray-400 text-xs md:text-base" />
              <span className="text-[9px] md:text-xs font-black text-gray-900 uppercase">
                {quiz.questions.length} Total
              </span>
            </div>
            <div className="px-4 md:px-6 py-2 md:py-3 bg-emerald-50 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3 text-emerald-600 border border-emerald-100">
              <FaCheckCircle className="text-xs md:text-base" />
              <span className="text-[9px] md:text-xs font-black uppercase">
                {correctCount} Correct
              </span>
            </div>
            <div className="px-4 md:px-6 py-2 md:py-3 bg-red-50 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3 text-red-500 border border-red-100">
              <FaTimesCircle className="text-xs md:text-base" />
              <span className="text-[9px] md:text-xs font-black uppercase">
                {incorrectCount} Incorrect
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Action Buttons - Top */}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        <button
          onClick={onRetest}
          className="flex-1 py-3.5 md:py-4 bg-emerald-600 text-white text-[10px] font-black uppercase rounded-xl md:rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 active:scale-95"
        >
          <FaRedo size={12} /> Try Again
        </button>
        <button
          onClick={onBack}
          className="flex-1 py-3.5 md:py-4 bg-gray-900 text-white text-[10px] font-black uppercase rounded-xl md:rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-lg active:scale-95"
        >
          <FaArrowLeft size={12} /> Dashboard
        </button>
      </div>

      {/* 3. Detailed Review Section */}
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center gap-3 px-2">
          <FaInfoCircle className="text-emerald-500 size-3 md:size-4" />
          <h3 className="text-[10px] md:text-sm font-black text-gray-900 uppercase tracking-widest">
            Detailed Review
          </h3>
        </div>

        {quiz.questions.map((q, qIdx) => {
          const userAns = userAnswers.find(
            (ua) => ua.questionId === q._id,
          )?.selectedOption;
          const isCorrect = userAns === q.correctAnswer;

          return (
            <div
              key={q._id}
              className="bg-white rounded-3xl md:rounded-4xl border border-gray-100 p-5 md:p-8 shadow-sm space-y-4 md:space-y-6"
            >
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 bg-gray-100 text-gray-500 text-[9px] md:text-[10px] font-black rounded-lg uppercase tracking-wider">
                  Question {qIdx + 1}
                </span>
                <div
                  className={`p-1.5 md:p-2 rounded-lg md:rounded-xl ${isCorrect ? "text-emerald-500 bg-emerald-50" : "text-red-500 bg-red-50"}`}
                >
                  {isCorrect ? (
                    <FaCheckCircle size={18} className="md:size-5" />
                  ) : (
                    <FaTimesCircle size={18} className="md:size-5" />
                  )}
                </div>
              </div>

              <h4 className="text-sm md:text-lg font-bold text-gray-800 leading-relaxed pr-2">
                {q.questionText}
              </h4>

              <div className="grid grid-cols-1 gap-2 md:gap-3">
                {q.options.map((option, oIdx) => {
                  const isThisCorrect = option === q.correctAnswer;
                  const isThisUserSelection = option === userAns;

                  let borderClass = "border-gray-50";
                  let bgClass = "bg-white";
                  let textClass = "text-gray-600";
                  let badge = null;

                  if (isThisCorrect) {
                    borderClass = "border-emerald-500";
                    bgClass = "bg-emerald-50/30";
                    textClass = "text-emerald-700 font-bold";
                    badge = (
                      <span className="text-[8px] md:text-[9px] font-black text-emerald-600 bg-emerald-100 px-1.5 md:px-2 py-0.5 rounded-md uppercase ml-auto shrink-0">
                        Correct
                      </span>
                    );
                  }

                  if (isThisUserSelection && !isThisCorrect) {
                    borderClass = "border-red-500";
                    bgClass = "bg-red-50/30";
                    textClass = "text-red-700 font-bold";
                    badge = (
                      <span className="text-[8px] md:text-[9px] font-black text-white bg-red-500 px-1.5 md:px-2 py-0.5 rounded-md uppercase ml-auto shrink-0">
                        You
                      </span>
                    );
                  }

                  return (
                    <div
                      key={oIdx}
                      className={`p-3 md:p-4 rounded-xl border-2 flex items-center gap-2 md:gap-3 transition-all ${borderClass} ${bgClass}`}
                    >
                      <div
                        className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full shrink-0 ${isThisCorrect ? "bg-emerald-500" : isThisUserSelection ? "bg-red-500" : "bg-gray-200"}`}
                      />
                      <span className={`text-xs md:text-sm leading-tight ${textClass}`}>{option}</span>
                      {badge}
                    </div>
                  );
                })}
              </div>

              {/* AI Explanation Box */}
              <div className="bg-gray-50 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-gray-100 flex gap-3 md:gap-4">
                <div className="text-emerald-500 mt-0.5 shrink-0">
                  <FaLightbulb size={12} className="md:size-4" />
                </div>
                <div>
                  <p className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    AI Logic
                  </p>
                  <p className="text-[11px] md:text-xs text-gray-600 font-medium leading-relaxed italic">
                    {q.explanation}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Buttons - Repeat for accessibility on mobile */}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pb-10">
        <button
          onClick={onRetest}
          className="flex-1 py-3.5 md:py-4 bg-emerald-600 text-white text-[10px] font-black uppercase rounded-xl md:rounded-2xl flex items-center justify-center gap-2 active:scale-95"
        >
          <FaRedo size={12} /> Retest Quiz
        </button>
        <button
          onClick={onBack}
          className="flex-1 py-3.5 md:py-4 bg-gray-900 text-white text-[10px] font-black uppercase rounded-xl md:rounded-2xl flex items-center justify-center gap-2 active:scale-95"
        >
          <FaArrowLeft size={12} /> Back Home
        </button>
      </div>
    </div>
  );
};

export default QuizResultView;