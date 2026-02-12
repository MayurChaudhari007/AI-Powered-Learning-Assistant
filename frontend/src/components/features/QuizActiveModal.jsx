// import React, { useState, useEffect } from "react";
// import {
//   FaChevronLeft,
//   FaChevronRight,
//   FaCheckCircle,
//   FaTimes,
//   FaTrophy,
//   FaLightbulb,
//   FaHistory,
// } from "react-icons/fa";
// import api from "../../api/axios";
// import QuizResultView from "./QuizResultView"; // We will create this next

// const QuizActiveModal = ({ quiz, onClose }) => {
//   // --- 1. State Management ---
//   const [currentStep, setCurrentStep] = useState("testing"); // 'testing' or 'results'
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState(
//     new Array(quiz.questions.length).fill(null),
//   );
//   const [submitting, setSubmitting] = useState(false);
//   const [finalResult, setFinalResult] = useState(null);

//   const currentQuestion = quiz.questions[currentIndex];
//   const isLastQuestion = currentIndex === quiz.questions.length - 1;
//   const allAnswered = answers.every((a) => a !== null);

//   // --- 2. Action Handlers ---
//   const handleSelect = (option) => {
//     const newAnswers = [...answers];
//     newAnswers[currentIndex] = option;
//     setAnswers(newAnswers);
//   };

//   const handleSubmit = async () => {
//     if (!allAnswered) return;
//     setSubmitting(true);

//     try {
//       // Calculate Score logic
//       let correctCount = 0;
//       const userAnswers = quiz.questions.map((q, idx) => {
//         const isCorrect = answers[idx] === q.correctAnswer;
//         if (isCorrect) correctCount++;
//         return { questionId: q._id, selectedOption: answers[idx] };
//       });

//       const score = Math.round((correctCount / quiz.questions.length) * 100);
//       const payload = {
//         score,
//         correctCount,
//         incorrectCount: quiz.questions.length - correctCount,
//         userAnswers,
//       };

//       const response = await api.post(`/quiz/${quiz._id}/submit`, payload);
//       setFinalResult({ ...payload, quiz: response.data });
//       setCurrentStep("results"); // Switch to results view
//     } catch (err) {
//       console.error("Submission failed:", err);
//       alert("Failed to submit quiz. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // --- 3. UI View: Active Testing ---
//   if (currentStep === "testing") {
//     return (
//       <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in fade-in duration-300">
//         {/* Header Section */}
//         <div className="p-6 border-b border-gray-100 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-all"
//             >
//               <FaTimes />
//             </button>
//             <div>
//               <h2 className="text-sm font-black text-gray-900 uppercase tracking-tight">
//                 {quiz.title}
//               </h2>
//               <div className="flex items-center gap-2">
//                 <div className="h-1.5 w-32 bg-gray-100 rounded-full overflow-hidden">
//                   <div
//                     className="h-full bg-emerald-500 transition-all duration-500"
//                     style={{
//                       width: `${((currentIndex + 1) / quiz.questions.length) * 100}%`,
//                     }}
//                   />
//                 </div>
//                 <span className="text-[10px] font-bold text-gray-400 uppercase">
//                   Question {currentIndex + 1} of {quiz.questions.length}
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full uppercase">
//             {answers.filter((a) => a !== null).length} Answered
//           </div>
//         </div>

//         {/* Question Area */}
//         <div className="flex-1 overflow-y-auto bg-gray-50/30 p-6 md:p-12 flex items-center justify-center">
//           <div className="w-full max-w-3xl bg-white p-8 md:p-12 rounded-4xl shadow-sm border border-gray-100">
//             <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase mb-6">
//               <FaLightbulb /> Question {currentIndex + 1}
//             </div>

//             <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-10 leading-relaxed">
//               {currentQuestion.questionText}
//             </h3>

//             <div className="grid grid-cols-1 gap-4">
//               {currentQuestion.options.map((option, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => handleSelect(option)}
//                   className={`group w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
//                     answers[currentIndex] === option
//                       ? "border-emerald-500 bg-emerald-50/50 shadow-md shadow-emerald-100"
//                       : "border-gray-100 hover:border-emerald-200 hover:bg-gray-50"
//                   }`}
//                 >
//                   <span
//                     className={`text-sm font-bold ${answers[currentIndex] === option ? "text-emerald-700" : "text-gray-600"}`}
//                   >
//                     {option}
//                   </span>
//                   <div
//                     className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
//                       answers[currentIndex] === option
//                         ? "border-emerald-500 bg-emerald-500"
//                         : "border-gray-200"
//                     }`}
//                   >
//                     {answers[currentIndex] === option && (
//                       <FaCheckCircle className="text-white text-xs" />
//                     )}
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Footer Navigation */}
//         <div className="p-6 bg-white border-t border-gray-100 flex items-center justify-between">
//           <button
//             onClick={() => setCurrentIndex(currentIndex - 1)}
//             disabled={currentIndex === 0}
//             className="px-8 py-3 rounded-xl border border-gray-200 text-gray-400 font-black text-[10px] uppercase hover:bg-gray-50 disabled:opacity-30 transition-all"
//           >
//             Previous
//           </button>

//           <div className="flex gap-2">
//             {quiz.questions.map((_, idx) => (
//               <div
//                 key={idx}
//                 className={`w-2 h-2 rounded-full transition-all ${
//                   idx === currentIndex
//                     ? "w-6 bg-emerald-500"
//                     : answers[idx] !== null
//                       ? "bg-emerald-200"
//                       : "bg-gray-200"
//                 }`}
//               />
//             ))}
//           </div>

//           {!isLastQuestion ? (
//             <button
//               onClick={() => setCurrentIndex(currentIndex + 1)}
//               className="px-8 py-3 bg-gray-900 text-white font-black text-[10px] uppercase rounded-xl hover:bg-emerald-600 transition-all active:scale-95"
//             >
//               Next Question
//             </button>
//           ) : (
//             <button
//               onClick={handleSubmit}
//               disabled={!allAnswered || submitting}
//               className="px-10 py-3 bg-emerald-600 text-white font-black text-[10px] uppercase rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-100 disabled:opacity-50 transition-all active:scale-95 flex items-center gap-2"
//             >
//               {submitting ? "Submitting..." : "Submit Quiz"}
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   }

//   // --- 4. UI View: Results (Delegated to sub-component) ---
//   return (
//     <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in slide-in-from-bottom-10 duration-500">
//       <QuizResultView
//         result={finalResult}
//         quiz={quiz}
//         userAnswers={answers}
//         onBack={onClose}
//         onRetest={() => {
//           setAnswers(new Array(quiz.questions.length).fill(null));
//           setCurrentIndex(0);
//           setCurrentStep("testing");
//         }}
//       />
//     </div>
//   );
// };

// export default QuizActiveModal;




import React, { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
  FaTimes,
  FaTrophy,
  FaLightbulb,
  FaHistory,
  FaSpinner,
} from "react-icons/fa";
import api from "../../api/axios";
import QuizResultView from "./QuizResultView"; 

const QuizActiveModal = ({ quiz, onClose }) => {
  // --- 1. State Management ---
  const [currentStep, setCurrentStep] = useState("testing"); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(
    new Array(quiz.questions.length).fill(null),
  );
  const [submitting, setSubmitting] = useState(false);
  const [finalResult, setFinalResult] = useState(null);

  const currentQuestion = quiz.questions[currentIndex];
  const isLastQuestion = currentIndex === quiz.questions.length - 1;
  const allAnswered = answers.every((a) => a !== null);

  // --- 2. Action Handlers ---
  const handleSelect = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = option;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (!allAnswered) return;
    setSubmitting(true);

    try {
      let correctCount = 0;
      const userAnswers = quiz.questions.map((q, idx) => {
        const isCorrect = answers[idx] === q.correctAnswer;
        if (isCorrect) correctCount++;
        return { questionId: q._id, selectedOption: answers[idx] };
      });

      const score = Math.round((correctCount / quiz.questions.length) * 100);
      const payload = {
        score,
        correctCount,
        incorrectCount: quiz.questions.length - correctCount,
        userAnswers,
      };

      const response = await api.post(`/quiz/${quiz._id}/submit`, payload);
      setFinalResult({ ...payload, quiz: response.data });
      setCurrentStep("results"); 
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Failed to submit quiz. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // --- 3. UI View: Active Testing ---
  if (currentStep === "testing") {
    return (
      <div className="fixed inset-0 z-100 bg-white flex flex-col animate-in fade-in duration-300">
        
        {/* Header Section - Optimized for Mobile */}
        <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3 md:gap-4 min-w-0">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-all shrink-0"
            >
              <FaTimes size={16} />
            </button>
            <div className="min-w-0">
              <h2 className="text-[10px] md:text-sm font-black text-gray-900 uppercase tracking-tight truncate">
                {quiz.title}
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="h-1.5 w-20 md:w-32 bg-gray-100 rounded-full overflow-hidden shrink-0">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{
                      width: `${((currentIndex + 1) / quiz.questions.length) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase whitespace-nowrap">
                  Q {currentIndex + 1} / {quiz.questions.length}
                </span>
              </div>
            </div>
          </div>
          <div className="text-[8px] md:text-[10px] font-black text-emerald-600 bg-emerald-50 px-2.5 md:px-4 py-1.5 md:py-2 rounded-full uppercase shrink-0">
            {answers.filter((a) => a !== null).length} <span className="hidden xs:inline">Done</span>
          </div>
        </div>

        {/* Question Area - Adaptive Padding */}
        <div className="flex-1 overflow-y-auto bg-gray-50/30 p-4 md:p-12 flex items-start md:items-center justify-center">
          <div className="w-full max-w-3xl bg-white p-6 md:p-12 rounded-3xl md:rounded-4xl shadow-sm border border-gray-100 my-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] md:text-[10px] font-black uppercase mb-4 md:mb-6">
              <FaLightbulb size={10} /> Question {currentIndex + 1}
            </div>

            <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-6 md:mb-10 leading-relaxed">
              {currentQuestion.questionText}
            </h3>

            <div className="grid grid-cols-1 gap-3 md:gap-4">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(option)}
                  className={`group w-full p-4 md:p-5 rounded-xl md:rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                    answers[currentIndex] === option
                      ? "border-emerald-500 bg-emerald-50/50 shadow-md shadow-emerald-100"
                      : "border-gray-100 hover:border-emerald-200 hover:bg-gray-50"
                  }`}
                >
                  <span
                    className={`text-[13px] md:text-sm font-bold leading-snug pr-3 ${answers[currentIndex] === option ? "text-emerald-700" : "text-gray-600"}`}
                  >
                    {option}
                  </span>
                  <div
                    className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                      answers[currentIndex] === option
                        ? "border-emerald-500 bg-emerald-500"
                        : "border-gray-200"
                    }`}
                  >
                    {answers[currentIndex] === option && (
                      <FaCheckCircle className="text-white text-[10px]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Navigation - Responsive Button Scaling */}
        <div className="p-4 md:p-6 bg-white border-t border-gray-100 flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrentIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="flex-1 md:flex-none md:px-8 py-3 rounded-xl border border-gray-200 text-gray-400 font-black text-[9px] md:text-[10px] uppercase hover:bg-gray-50 disabled:opacity-30 transition-all active:scale-95"
          >
            Prev
          </button>

          {/* Navigation Dots - Hidden on very small screens to avoid wrap */}
          <div className="hidden sm:flex gap-1.5 md:gap-2">
            {quiz.questions.map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? "w-4 md:w-6 bg-emerald-500"
                    : answers[idx] !== null
                      ? "bg-emerald-200"
                      : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          {!isLastQuestion ? (
            <button
              onClick={() => setCurrentIndex(currentIndex + 1)}
              className="flex-1 md:flex-none md:px-8 py-3 bg-gray-900 text-white font-black text-[9px] md:text-[10px] uppercase rounded-xl hover:bg-emerald-600 transition-all active:scale-95"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered || submitting}
              className="flex-[1.5] md:flex-none md:px-10 py-3 bg-emerald-600 text-white font-black text-[9px] md:text-[10px] uppercase rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-100 disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {submitting ? <FaSpinner className="animate-spin" /> : <FaCheckCircle />}
              <span className="truncate">{submitting ? "Submitting..." : "Finish"}</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // --- 4. UI View: Results ---
  return (
    <div className="fixed inset-0 z-100 bg-white overflow-y-auto animate-in slide-in-from-bottom-10 duration-500">
      <QuizResultView
        result={finalResult}
        quiz={quiz}
        userAnswers={answers}
        onBack={onClose}
        onRetest={() => {
          setAnswers(new Array(quiz.questions.length).fill(null));
          setCurrentIndex(0);
          setCurrentStep("testing");
        }}
      />
    </div>
  );
};

export default QuizActiveModal;