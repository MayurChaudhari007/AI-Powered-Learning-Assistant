
// import React, { useState, useEffect } from "react";
// import {
//   FaQuestionCircle,
//   FaPlus,
//   FaSpinner,
//   FaTrophy,
// } from "react-icons/fa";
// import api from "../../api/axios";
// import QuizCard from "./QuizCard";
// import QuizResultView from "./QuizResultView"; // Import the results view
// import GenerateQuizModal from "./GenerateQuizModal";
// import QuizActiveModal from "./QuizActiveModal";
// import DeleteConfirmModal from "./DeleteConfirmModal";

// const QuizList = ({ documentId }) => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isGenModalOpen, setIsGenModalOpen] = useState(false);
//   const [activeQuiz, setActiveQuiz] = useState(null);
  
//   // New state to handle viewing past results
//   const [viewingResults, setViewingResults] = useState(null);

//   const [deleteModal, setDeleteModal] = useState({
//     isOpen: false,
//     id: null,
//     title: "",
//   });
//   const [isDeleting, setIsDeleting] = useState(false);

//   // 1. Fetch all quizzes for this specific document
//   const fetchQuizzes = async () => {
//     try {
//       const response = await api.get(`/quiz/document/${documentId}`);
//       setQuizzes(response.data);
//     } catch (error) {
//       console.error("Error fetching quizzes:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchQuizzes();
//   }, [documentId]);

//   // 2. Handle Deletion logic
//   const handleFinalDelete = async () => {
//     setIsDeleting(true);
//     try {
//       await api.delete(`/quiz/${deleteModal.id}`);
//       setQuizzes((prev) => prev.filter((q) => q._id !== deleteModal.id));
//       setDeleteModal({ isOpen: false, id: null, title: "" });
//     } catch (error) {
//       console.error("Delete failed:", error);
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="h-96 flex flex-col items-center justify-center space-y-4">
//         <FaSpinner className="animate-spin text-emerald-500 text-3xl" />
//         <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
//           Loading Quiz Library
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="h-full flex flex-col space-y-6">
//       {/* Top Action Bar */}
//       <div className="flex items-center justify-between bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
//         <div className="flex items-center gap-4">
//           <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-500 shadow-sm">
//             <FaTrophy size={20} />
//           </div>
//           <div>
//             <h3 className="text-xs font-black text-gray-900 uppercase tracking-tight">
//               Knowledge Quizzes
//             </h3>
//             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
//               {quizzes.length} Quizzes Available
//             </p>
//           </div>
//         </div>

//         <button
//           onClick={() => setIsGenModalOpen(true)}
//           className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white text-[10px] font-black uppercase rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 active:scale-95"
//         >
//           <FaPlus /> Generate Quiz
//         </button>
//       </div>

//       {/* Main Content Grid */}
//       <div className="flex-1">
//         {quizzes.length === 0 ? (
//           <div className="h-96 flex flex-col items-center justify-center text-center p-8 bg-white rounded-4xl border-2 border-dashed border-gray-100">
//             <div className="bg-emerald-50 p-10 rounded-full mb-6 rotate-3">
//               <FaQuestionCircle className="text-5xl text-emerald-500 opacity-40" />
//             </div>
//             <h3 className="text-xl font-black text-gray-900 uppercase">
//               Challenge Yourself
//             </h3>
//             <p className="text-xs text-gray-400 font-bold max-w-xs mt-2 uppercase tracking-tight">
//               No quizzes generated yet. Click the button above to start your AI evaluation.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">
//             {quizzes.map((quiz) => (
//               <QuizCard
//                 key={quiz._id}
//                 quiz={quiz}
//                 onStart={() => setActiveQuiz(quiz)}
                
//                 // FIX: Pass the function to handle View Results
//                 onViewResults={(q) => setViewingResults(q)}
                
//                 // FIX: Correctly trigger the delete modal
//                 onDelete={(id, title) => setDeleteModal({ isOpen: true, id, title })}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* --- MODALS --- */}

//       {/* 1. View Historical Results Modal */}
//       {viewingResults && (
//         <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in slide-in-from-bottom-10 duration-500">
//           <QuizResultView 
//             quiz={viewingResults}
//             // Get the data from the most recent attempt
//             result={viewingResults.attempts[viewingResults.attempts.length - 1]}
//             onBack={() => setViewingResults(null)}
//             onRetest={() => {
//               setActiveQuiz(viewingResults);
//               setViewingResults(null);
//             }}
//           />
//         </div>
//       )}

//       {/* 2. Generation Modal */}
//       <GenerateQuizModal
//         isOpen={isGenModalOpen}
//         onClose={() => setIsGenModalOpen(false)}
//         documentId={documentId}
//         onGenerated={fetchQuizzes}
//       />

//       {/* 3. The Test Runner Modal */}
//       {activeQuiz && (
//         <QuizActiveModal
//           quiz={activeQuiz}
//           onClose={() => {
//             setActiveQuiz(null);
//             fetchQuizzes(); 
//           }}
//         />
//       )}

//       {/* 4. Delete Confirmation Modal */}
//       <DeleteConfirmModal
//         isOpen={deleteModal.isOpen}
//         onClose={() => setDeleteModal({ isOpen: false, id: null, title: "" })}
//         onConfirm={handleFinalDelete}
//         isDeleting={isDeleting}
//         docTitle={deleteModal.title}
//       />
//     </div>
//   );
// };

// export default QuizList;




import React, { useState, useEffect } from "react";
import {
  FaQuestionCircle,
  FaPlus,
  FaSpinner,
  FaTrophy,
} from "react-icons/fa";
import api from "../../api/axios";
import QuizCard from "./QuizCard";
import QuizResultView from "./QuizResultView"; 
import GenerateQuizModal from "./GenerateQuizModal";
import QuizActiveModal from "./QuizActiveModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

const QuizList = ({ documentId }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGenModalOpen, setIsGenModalOpen] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [viewingResults, setViewingResults] = useState(null);

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: null,
    title: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchQuizzes = async () => {
    try {
      const response = await api.get(`/quiz/document/${documentId}`);
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [documentId]);

  const handleFinalDelete = async () => {
    setIsDeleting(true);
    try {
      await api.delete(`/quiz/${deleteModal.id}`);
      setQuizzes((prev) => prev.filter((q) => q._id !== deleteModal.id));
      setDeleteModal({ isOpen: false, id: null, title: "" });
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="h-64 md:h-96 flex flex-col items-center justify-center space-y-4">
        <FaSpinner className="animate-spin text-emerald-500 text-2xl md:text-3xl" />
        <p className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest text-center">
          Loading Quiz Library
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-4 md:space-y-6">
      {/* Top Action Bar - Responsive Stack */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between bg-white p-4 md:p-6 rounded-3xl md:rounded-4xl border border-gray-100 shadow-sm gap-4">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="p-2.5 md:p-3 bg-emerald-50 rounded-xl md:rounded-2xl text-emerald-500 shadow-sm shrink-0">
            <FaTrophy size={16} className="md:size-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-[10px] md:text-xs font-black text-gray-900 uppercase tracking-tight leading-none">
              Knowledge Quizzes
            </h3>
            <p className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase mt-1">
              {quizzes.length} Quizzes Available
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsGenModalOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-3.5 md:py-3 bg-emerald-600 text-white text-[9px] md:text-[10px] font-black uppercase rounded-xl md:rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 active:scale-95"
        >
          <FaPlus size={10} /> Generate Quiz
        </button>
      </div>

      {/* Main Content Grid - Responsive Columns */}
      <div className="flex-1">
        {quizzes.length === 0 ? (
          <div className="h-64 md:h-96 flex flex-col items-center justify-center text-center p-6 md:p-8 bg-white rounded-3xl md:rounded-4xl border-2 border-dashed border-gray-100">
            <div className="bg-emerald-50 p-6 md:p-10 rounded-full mb-4 md:mb-6 rotate-3">
              <FaQuestionCircle className="text-3xl md:text-5xl text-emerald-500 opacity-40" />
            </div>
            <h3 className="text-base md:text-xl font-black text-gray-900 uppercase">
              Challenge Yourself
            </h3>
            <p className="text-[10px] md:text-xs text-gray-400 font-bold max-w-50 md:max-w-xs mt-2 uppercase tracking-tight mx-auto">
              No quizzes generated yet. Start your AI evaluation now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-in slide-in-from-bottom-4 duration-500">
            {quizzes.map((quiz) => (
              <QuizCard
                key={quiz._id}
                quiz={quiz}
                onStart={() => setActiveQuiz(quiz)}
                onViewResults={(q) => setViewingResults(q)}
                onDelete={(id, title) => setDeleteModal({ isOpen: true, id, title })}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {viewingResults && (
        <div className="fixed inset-0 z-100 bg-white overflow-y-auto animate-in slide-in-from-bottom-10 duration-500">
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

      <GenerateQuizModal
        isOpen={isGenModalOpen}
        onClose={() => setIsGenModalOpen(false)}
        documentId={documentId}
        onGenerated={fetchQuizzes}
      />

      {activeQuiz && (
        <QuizActiveModal
          quiz={activeQuiz}
          onClose={() => {
            setActiveQuiz(null);
            fetchQuizzes(); 
          }}
        />
      )}

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null, title: "" })}
        onConfirm={handleFinalDelete}
        isDeleting={isDeleting}
        docTitle={deleteModal.title}
      />
    </div>
  );
};

export default QuizList;