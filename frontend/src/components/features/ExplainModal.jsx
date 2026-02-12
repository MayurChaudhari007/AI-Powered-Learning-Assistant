// import React, { useState } from "react";
// import {
//   FaTimes,
//   FaLightbulb,
//   FaRegCopy,
//   FaCheck,
//   FaBookOpen,
// } from "react-icons/fa";
// import ReactMarkdown from "react-markdown";
// import clsx from "clsx";

// const ExplainModal = ({ isOpen, onClose, term, explanation, docTitle }) => {
//   const [copied, setCopied] = useState(false);

//   if (!isOpen) return null;

//   // Helper to ensure every sentence in the explanation starts with a bullet for attractiveness
//   const formatExplanation = (text) => {
//     if (!text) return "";
//     return text
//       .split("\n")
//       .filter((line) => line.trim().length > 0)
//       .map((line) =>
//         line.startsWith("*") || line.startsWith("•") ? line : `* ${line}`,
//       )
//       .join("\n\n");
//   };

//   const formattedExplanation = formatExplanation(explanation);

//   const copyToClipboard = () => {
//     if (!explanation) return;
//     navigator.clipboard.writeText(`${term}: ${explanation}`);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
//       {/* 1. Backdrop Blur */}
//       <div
//         className="absolute inset-0 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300"
//         onClick={onClose}
//       />

//       {/* 2. Modal Container */}
//       <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 flex flex-col max-h-[85vh]">
//         {/* Header */}
//         <div className="px-6 py-5 md:px-10 md:py-8 border-b border-gray-50 flex items-center justify-between bg-white sticky top-0 z-10">
//           <div className="flex items-center gap-4">
//             <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 border border-amber-100/50 shadow-sm">
//               <FaLightbulb size={20} />
//             </div>
//             <div>
//               <h3 className="text-sm md:text-base font-black text-gray-900 uppercase tracking-tight line-clamp-1">
//                 {term || "Concept Explained"}
//               </h3>
//               <div className="flex items-center gap-2">
//                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
//                 <span className="text-[9px] md:text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
//                   AI Knowledge breakdown
//                 </span>
//               </div>
//             </div>
//           </div>

//           <button
//             onClick={onClose}
//             className="p-2 md:p-3 text-gray-300 hover:text-gray-900 hover:bg-gray-50 rounded-2xl transition-all"
//           >
//             <FaTimes size={18} />
//           </button>
//         </div>

//         {/* Body Content */}
//         <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-white">
//           <div
//             className="prose prose-sm md:prose-base prose-emerald max-w-none 
//             prose-ul:list-none prose-ul:p-0 prose-ul:m-0
//             prose-li:relative prose-li:pl-8 prose-li:mb-6
//             prose-li:text-gray-700 prose-li:leading-relaxed prose-li:font-semibold
            
//             /* Custom Emerald Bullet Icon for attractiveness */
//             before:prose-li:content-[''] before:prose-li:absolute before:prose-li:left-0 before:prose-li:top-[0.6em]
//             before:prose-li:w-2.5 before:prose-li:h-2.5 before:prose-li:bg-emerald-500 before:prose-li:rounded-full
//             before:prose-li:shadow-[0_0_10px_rgba(16,185,129,0.4)]"
//           >
//             <p className="mb-6 flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
//               <FaBookOpen /> Based on {docTitle || "Current Document"}
//             </p>

//             <ReactMarkdown>{formattedExplanation}</ReactMarkdown>
//           </div>
//         </div>

//         {/* Footer Actions */}
//         <div className="px-6 py-5 md:px-10 md:py-8 border-t border-gray-50 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
//           <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] text-center">
//             Saved to Log • Gemini 2.5 Flash
//           </span>

//           <div className="flex items-center gap-3 w-full sm:w-auto">
//             <button
//               onClick={copyToClipboard}
//               className={clsx(
//                 "flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase transition-all shadow-sm border",
//                 copied
//                   ? "bg-emerald-600 text-white border-emerald-600"
//                   : "bg-white text-gray-500 hover:text-emerald-600 border border-gray-100",
//               )}
//             >
//               {copied ? <FaCheck /> : <FaRegCopy />}
//               {copied ? "Copied" : "Copy to Clipboard"}
//             </button>

//             <button
//               onClick={onClose}
//               className="flex-1 sm:flex-none px-10 py-3 bg-gray-900 text-white text-[10px] font-black uppercase rounded-2xl hover:bg-black transition-all shadow-lg shadow-gray-200"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExplainModal;





import React, { useState } from "react";
import {
  FaTimes,
  FaLightbulb,
  FaRegCopy,
  FaCheck,
  FaBookOpen,
} from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import clsx from "clsx";

const ExplainModal = ({ isOpen, onClose, term, explanation, docTitle }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Helper to ensure every sentence starts with a bullet
  const formatExplanation = (text) => {
    if (!text) return "";
    return text
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((line) =>
        line.startsWith("*") || line.startsWith("•") ? line : `* ${line}`,
      )
      .join("\n\n");
  };

  const formattedExplanation = formatExplanation(explanation);

  const copyToClipboard = () => {
    if (!explanation) return;
    navigator.clipboard.writeText(`${term}: ${explanation}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-4">
      {/* 1. Backdrop Blur */}
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* 2. Modal Container - Responsive adjustments */}
      <div className="relative w-full max-w-2xl bg-white rounded-4xl md:rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 flex flex-col max-h-[90vh]">
        {/* Header - Adjusted padding for mobile */}
        <div className="px-5 py-4 md:px-10 md:py-8 border-b border-gray-50 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3 md:gap-4 min-w-0">
            <div className="w-9 h-9 md:w-12 md:h-12 bg-amber-50 rounded-xl md:rounded-2xl flex items-center justify-center text-amber-600 border border-amber-100/50 shadow-sm shrink-0">
              <FaLightbulb size={16} className="md:size-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs md:text-base font-black text-gray-900 uppercase tracking-tight truncate pr-2">
                {term || "Concept Explained"}
              </h3>
              <div className="flex items-center gap-1.5 md:gap-2">
                <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] md:text-[10px] font-bold text-emerald-500 uppercase tracking-widest leading-none">
                  AI Breakdown
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 md:p-3 text-gray-300 hover:text-gray-900 hover:bg-gray-50 rounded-xl md:rounded-2xl transition-all shrink-0"
          >
            <FaTimes size={16} className="md:size-4.5" />
          </button>
        </div>

        {/* Body Content - Responsive Prose */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 bg-white">
          <div
            className="prose prose-xs sm:prose-sm md:prose-base prose-emerald max-w-none 
            prose-ul:list-none prose-ul:p-0 prose-ul:m-0
            prose-li:relative prose-li:pl-6 md:prose-li:pl-8 prose-li:mb-4 md:prose-li:mb-6
            prose-li:text-gray-700 prose-li:leading-relaxed prose-li:font-semibold
            
            /* Custom Emerald Bullet Icon */
            before:prose-li:content-[''] before:prose-li:absolute before:prose-li:left-0 before:prose-li:top-[0.6em]
            before:prose-li:w-2 before:prose-li:h-2 md:before:prose-li:w-2.5 md:before:prose-li:h-2.5 before:prose-li:bg-emerald-500 before:prose-li:rounded-full"
          >
            <p className="mb-4 md:mb-6 flex items-center gap-2 text-gray-400 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] leading-none">
              <FaBookOpen size={10} /> {docTitle || "Current Document"}
            </p>

            <ReactMarkdown>{formattedExplanation}</ReactMarkdown>
          </div>
        </div>

        {/* Footer Actions - Stackable for mobile */}
        <div className="px-5 py-4 md:px-10 md:py-8 border-t border-gray-50 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
          <span className="text-[8px] md:text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] text-center sm:text-left">
            Saved to Log • Gemini 2.5 Flash
          </span>

          <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
            <button
              onClick={copyToClipboard}
              className={clsx(
                "flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase transition-all shadow-sm border",
                copied
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-gray-500 hover:text-emerald-600 border-gray-100",
              )}
            >
              {copied ? <FaCheck size={10} /> : <FaRegCopy size={10} />}
              <span className="truncate">{copied ? "Copied" : "Copy"}</span>
            </button>

            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-6 md:px-10 py-2.5 md:py-3 bg-gray-900 text-white text-[9px] md:text-[10px] font-black uppercase rounded-xl md:rounded-2xl hover:bg-black transition-all active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplainModal;