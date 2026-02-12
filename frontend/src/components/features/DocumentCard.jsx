

// import React, { useState, useEffect } from "react";
// import {
//   FaFilePdf,
//   FaTrash,
//   FaBrain,
//   FaQuestionCircle,
//   FaClock,
//   FaSpinner,
//   FaPlusCircle,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import api from "../../api/axios";
// import DeleteConfirmModal from "./DeleteConfirmModal";

// const DocumentCard = ({ doc: initialDoc, onDelete }) => {
//   const [doc, setDoc] = useState(initialDoc);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

//   // Sync with initial props
//   useEffect(() => {
//     setDoc(initialDoc);
//   }, [initialDoc]);

//   // Polling for AI status if processing
//   useEffect(() => {
//     let interval;
//     if (doc.status === "processing") {
//       interval = setInterval(async () => {
//         try {
//           const response = await api.get(`/documents/${doc._id}`);
//           if (response.data.status !== "processing") {
//             setDoc(response.data);
//             clearInterval(interval);
//           }
//         } catch (err) {
//           clearInterval(interval);
//         }
//       }, 3000);
//     }
//     return () => clearInterval(interval);
//   }, [doc.status, doc._id]);

//   const formatFileSize = (bytes) => {
//     if (!bytes) return "0 KB";
//     const kb = bytes / 1024;
//     return kb < 1024 ? `${kb.toFixed(1)} KB` : `${(kb / 1024).toFixed(1)} MB`;
//   };

//   const getRelativeTime = (date) => {
//     const diff = Math.floor((new Date() - new Date(date)) / 1000);
//     if (diff < 60) return "Just now";
//     if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
//     if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
//     return new Date(date).toLocaleDateString();
//   };

//   const isProcessing = doc.status === "processing";

//   return (
//     <>
//       <div className="bg-white border border-gray-100 rounded-4xl p-2 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative group w-full overflow-hidden">
//         {/* Visual Accent Gradient */}
//         <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-emerald-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//         <Link
//           to={isProcessing ? "#" : `/documents/${doc._id}`}
//           className={`block p-5 ${isProcessing ? "cursor-wait" : ""}`}
//           onClick={(e) => isProcessing && e.preventDefault()}
//         >
//           {/* Header: Icon & File Info */}
//           <div className="flex items-start justify-between mb-8">
//             <div className="relative p-5 bg-emerald-50 rounded-3xl group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
//               <FaFilePdf className="text-3xl" />
//               {isProcessing && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[1px] rounded-3xl">
//                   <FaSpinner className="text-emerald-600 animate-spin text-xl" />
//                 </div>
//               )}
//             </div>

//             <div className="text-right">
//               <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
//                 Size
//               </p>
//               <p className="text-xs font-bold text-gray-500">
//                 {formatFileSize(doc.fileSize)}
//               </p>
//             </div>
//           </div>

//           {/* Title Section */}
//           <div className="space-y-2 mb-8">
//             <h3
//               className="text-xl font-black text-gray-900 truncate leading-tight tracking-tight"
//               title={doc.title}
//             >
//               {doc.title}
//             </h3>
//             {isProcessing ? (
//               <span className="flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase tracking-widest animate-pulse">
//                 <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" /> AI
//                 Extracting Data...
//               </span>
//             ) : (
//               <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">
//                 Ready for Analysis
//               </span>
//             )}
//           </div>

//           {/* COUNTS SECTION: Flashcards & Quizzes */}

//           {/* COUNTS SECTION: Flashcards & Quizzes */}
//           <div className="flex flex-wrap gap-3 mb-8">
//             {/* Flashcard Badge */}
//             <div
//               className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all border ${
//                 isProcessing
//                   ? "bg-gray-50 text-gray-300 border-transparent"
//                   : "bg-purple-50 text-purple-600 border-purple-100 group-hover:border-purple-300"
//               }`}
//             >
//               <FaBrain />
//               {/* Simple count display: Shows '0 Flashcards' if count is 0 */}
//               <span>{doc.flashcardCount || 0} Flashcards</span>
//             </div>

//             {/* Quiz Badge */}
//             <div
//               className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all border ${
//                 isProcessing
//                   ? "bg-gray-50 text-gray-300 border-transparent"
//                   : "bg-blue-50 text-blue-600 border-blue-100 group-hover:border-blue-300"
//               }`}
//             >
//               <FaQuestionCircle />
//               {/* Simple count display: Shows '0 Quizzes' if count is 0 */}
//               <span>{doc.quizCount || 0} Quizzes</span>
//             </div>
//           </div>

//           <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
//             <div className="flex items-center text-gray-400 text-[10px] font-black uppercase tracking-widest">
//               <FaClock className="mr-2 opacity-50" />
//               {getRelativeTime(doc.createdAt)}
//             </div>
//             {!isProcessing && (
//               <FaPlusCircle className="text-emerald-500 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500" />
//             )}
//           </div>
//         </Link>

//         {/* Delete Button */}
//         <button
//           onClick={(e) => {
//             e.preventDefault();
//             e.stopPropagation();
//             setIsDeleteModalOpen(true);
//           }}
//           className="absolute top-4 right-4 p-3 bg-red-50 text-red-400 rounded-2xl md:opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-110 active:scale-90 shadow-sm"
//         >
//           <FaTrash size={12} />
//         </button>
//       </div>

//       <DeleteConfirmModal
//         isOpen={isDeleteModalOpen}
//         onClose={() => setIsDeleteModalOpen(false)}
//         onConfirm={() => {
//           onDelete(doc._id);
//           setIsDeleteModalOpen(false);
//         }}
//         docTitle={doc.title}
//       />
//     </>
//   );
// };

// export default DocumentCard;





import React, { useState, useEffect } from "react";
import {
  FaFilePdf,
  FaTrash,
  FaBrain,
  FaQuestionCircle,
  FaClock,
  FaSpinner,
  FaPlusCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import DeleteConfirmModal from "./DeleteConfirmModal";

const DocumentCard = ({ doc: initialDoc, onDelete }) => {
  const [doc, setDoc] = useState(initialDoc);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Sync with initial props
  useEffect(() => {
    setDoc(initialDoc);
  }, [initialDoc]);

  // Polling for AI status if processing
  useEffect(() => {
    let interval;
    if (doc.status === "processing") {
      interval = setInterval(async () => {
        try {
          const response = await api.get(`/documents/${doc._id}`);
          if (response.data.status !== "processing") {
            setDoc(response.data);
            clearInterval(interval);
          }
        } catch (err) {
          clearInterval(interval);
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [doc.status, doc._id]);

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";
    const kb = bytes / 1024;
    return kb < 1024 ? `${kb.toFixed(1)} KB` : `${(kb / 1024).toFixed(1)} MB`;
  };

  const getRelativeTime = (date) => {
    const diff = Math.floor((new Date() - new Date(date)) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return new Date(date).toLocaleDateString();
  };

  const isProcessing = doc.status === "processing";

  return (
    <>
      <div className="bg-white border border-gray-100 rounded-3xl md:rounded-4xl p-1.5 md:p-2 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative group w-full overflow-hidden">
        {/* Visual Accent Gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-emerald-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <Link
          to={isProcessing ? "#" : `/documents/${doc._id}`}
          className={`block p-4 md:p-5 ${isProcessing ? "cursor-wait" : ""}`}
          onClick={(e) => isProcessing && e.preventDefault()}
        >
          {/* Header: Icon & File Info */}
          <div className="flex items-start justify-between mb-4 md:mb-8">
            <div className="relative p-4 md:p-5 bg-emerald-50 rounded-2xl md:rounded-3xl group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
              <FaFilePdf className="text-2xl md:text-3xl" />
              {isProcessing && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[1px] rounded-2xl md:rounded-3xl">
                  <FaSpinner className="text-emerald-600 animate-spin text-lg md:text-xl" />
                </div>
              )}
            </div>

            <div className="text-right">
              <p className="text-[8px] md:text-[10px] font-black text-gray-300 uppercase tracking-widest">
                Size
              </p>
              <p className="text-[10px] md:text-xs font-bold text-gray-500">
                {formatFileSize(doc.fileSize)}
              </p>
            </div>
          </div>

          {/* Title Section */}
          <div className="space-y-1 md:space-y-2 mb-4 md:mb-8">
            <h3
              className="text-lg md:text-xl font-black text-gray-900 truncate leading-tight tracking-tight"
              title={doc.title}
            >
              {doc.title}
            </h3>
            {isProcessing ? (
              <span className="flex items-center gap-1.5 md:gap-2 text-[8px] md:text-[10px] font-black text-amber-500 uppercase tracking-widest animate-pulse">
                <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-amber-500 rounded-full" /> AI
                Processing...
              </span>
            ) : (
              <span className="text-[8px] md:text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">
                Ready for Analysis
              </span>
            )}
          </div>

          {/* COUNTS SECTION: Flashcards & Quizzes */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-8">
            {/* Flashcard Badge */}
            <div
              className={`flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase tracking-wider transition-all border ${
                isProcessing
                  ? "bg-gray-50 text-gray-300 border-transparent"
                  : "bg-purple-50 text-purple-600 border-purple-100 group-hover:border-purple-300"
              }`}
            >
              <FaBrain className="text-[10px] md:text-xs" />
              <span>{doc.flashcardCount || 0} Cards</span>
            </div>

            {/* Quiz Badge */}
            <div
              className={`flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase tracking-wider transition-all border ${
                isProcessing
                  ? "bg-gray-50 text-gray-300 border-transparent"
                  : "bg-blue-50 text-blue-600 border-blue-100 group-hover:border-blue-300"
              }`}
            >
              <FaQuestionCircle className="text-[10px] md:text-xs" />
              <span>{doc.quizCount || 0} Quizzes</span>
            </div>
          </div>

          <div className="pt-4 md:pt-6 border-t border-gray-50 flex items-center justify-between">
            <div className="flex items-center text-gray-400 text-[8px] md:text-[10px] font-black uppercase tracking-widest">
              <FaClock className="mr-1.5 md:mr-2 opacity-50" />
              {getRelativeTime(doc.createdAt)}
            </div>
            {!isProcessing && (
              <FaPlusCircle className="text-emerald-500 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 hidden md:block" />
            )}
          </div>
        </Link>

        {/* Delete Button - Optimized for Mobile visibility */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDeleteModalOpen(true);
          }}
          className="absolute top-3 right-3 md:top-4 md:right-4 p-2.5 md:p-3 bg-red-50 text-red-400 rounded-xl md:rounded-2xl md:opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm active:scale-90"
        >
          <FaTrash size={10} />
        </button>
      </div>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          onDelete(doc._id);
          setIsDeleteModalOpen(false);
        }}
        docTitle={doc.title}
      />
    </>
  );
};

export default DocumentCard;