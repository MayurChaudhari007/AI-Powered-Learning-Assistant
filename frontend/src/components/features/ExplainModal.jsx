
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

//   // Helper to ensure every sentence starts with a bullet
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
//     <div className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-4">
//       {/* 1. Backdrop Blur */}
//       <div
//         className="absolute inset-0 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300"
//         onClick={onClose}
//       />

//       {/* 2. Modal Container - Responsive adjustments */}
//       <div className="relative w-full max-w-2xl bg-white rounded-4xl md:rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 flex flex-col max-h-[90vh]">
//         {/* Header - Adjusted padding for mobile */}
//         <div className="px-5 py-4 md:px-10 md:py-8 border-b border-gray-50 flex items-center justify-between bg-white sticky top-0 z-10">
//           <div className="flex items-center gap-3 md:gap-4 min-w-0">
//             <div className="w-9 h-9 md:w-12 md:h-12 bg-amber-50 rounded-xl md:rounded-2xl flex items-center justify-center text-amber-600 border border-amber-100/50 shadow-sm shrink-0">
//               <FaLightbulb size={16} className="md:size-5" />
//             </div>
//             <div className="min-w-0">
//               <h3 className="text-xs md:text-base font-black text-gray-900 uppercase tracking-tight truncate pr-2">
//                 {term || "Concept Explained"}
//               </h3>
//               <div className="flex items-center gap-1.5 md:gap-2">
//                 <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-emerald-500 animate-pulse" />
//                 <span className="text-[8px] md:text-[10px] font-bold text-emerald-500 uppercase tracking-widest leading-none">
//                   AI Breakdown
//                 </span>
//               </div>
//             </div>
//           </div>

//           <button
//             onClick={onClose}
//             className="p-2 md:p-3 text-gray-300 hover:text-gray-900 hover:bg-gray-50 rounded-xl md:rounded-2xl transition-all shrink-0"
//           >
//             <FaTimes size={16} className="md:size-4.5" />
//           </button>
//         </div>

//         {/* Body Content - Responsive Prose */}
//         <div className="flex-1 overflow-y-auto p-6 md:p-12 bg-white">
//           <div
//             className="prose prose-xs sm:prose-sm md:prose-base prose-emerald max-w-none 
//             prose-ul:list-none prose-ul:p-0 prose-ul:m-0
//             prose-li:relative prose-li:pl-6 md:prose-li:pl-8 prose-li:mb-4 md:prose-li:mb-6
//             prose-li:text-gray-700 prose-li:leading-relaxed prose-li:font-semibold
            
//             /* Custom Emerald Bullet Icon */
//             before:prose-li:content-[''] before:prose-li:absolute before:prose-li:left-0 before:prose-li:top-[0.6em]
//             before:prose-li:w-2 before:prose-li:h-2 md:before:prose-li:w-2.5 md:before:prose-li:h-2.5 before:prose-li:bg-emerald-500 before:prose-li:rounded-full"
//           >
//             <p className="mb-4 md:mb-6 flex items-center gap-2 text-gray-400 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] leading-none">
//               <FaBookOpen size={10} /> {docTitle || "Current Document"}
//             </p>

//             <ReactMarkdown>{formattedExplanation}</ReactMarkdown>
//           </div>
//         </div>

//         {/* Footer Actions - Stackable for mobile */}
//         <div className="px-5 py-4 md:px-10 md:py-8 border-t border-gray-50 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
//           <span className="text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] text-center sm:text-left">
//             Gemini AI is used
//           </span>

//           <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
//             <button
//               onClick={copyToClipboard}
//               className={clsx(
//                 "flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase transition-all shadow-sm border",
//                 copied
//                   ? "bg-emerald-600 text-white border-emerald-600"
//                   : "bg-white text-gray-500 hover:text-emerald-600 border-gray-100",
//               )}
//             >
//               {copied ? <FaCheck size={10} /> : <FaRegCopy size={10} />}
//               <span className="truncate">{copied ? "Copied" : "Copy"}</span>
//             </button>

//             <button
//               onClick={onClose}
//               className="flex-1 sm:flex-none px-6 md:px-10 py-2.5 md:py-3 bg-gray-900 text-white text-[9px] md:text-[10px] font-black uppercase rounded-xl md:rounded-2xl hover:bg-black transition-all active:scale-95"
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



import React, { useState, useEffect } from "react";
import {
  FaTimes,
  FaLightbulb,
  FaRegCopy,
  FaCheck,
  FaBookOpen,
  FaMagic,
} from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import clsx from "clsx";

const ExplainModal = ({ isOpen, onClose, term, explanation, docTitle }) => {
  const [copied, setCopied] = useState(false);

  // Prevent background scrolling when modal is open (Crucial for mobile)
  useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
    return () => document.body.style.overflow = 'unset';
  }, [isOpen]);

  if (!isOpen) return null;

  const copyToClipboard = () => {
    if (!explanation) return;
    navigator.clipboard.writeText(`${term}: ${explanation}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    // justify-end on mobile for Bottom Sheet effect, center on desktop
    <div className="fixed inset-0 z-100 flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4 font-sans">
      
      {/* 1. Backdrop Blur */}
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* 2. Modal Container: Bottom sheet on mobile, centered card on desktop */}
      <div className="relative w-full sm:max-w-2xl bg-[#fdfdfd] rounded-t-[2.5rem] sm:rounded-[3rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-10 sm:zoom-in-95 duration-500 flex flex-col max-h-[92vh] sm:max-h-[85vh]">
        
        {/* Mobile Drag Handle Indicator */}
        <div className="w-full flex justify-center pt-3 pb-1 sm:hidden absolute top-0 z-20">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
        </div>

        {/* Header - Sticky */}
        <div className="px-6 py-5 sm:px-10 sm:py-8 border-b border-gray-100 flex items-center justify-between bg-white/95 backdrop-blur-xl sticky top-0 z-10 pt-8 sm:pt-8">
            <div className="flex items-center gap-4 min-w-0">
                
                {/* Glowing Lightbulb Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-100/50 shadow-[0_0_20px_-5px_rgba(245,158,11,0.4)] shrink-0 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-linear-to-tr from-amber-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <FaLightbulb size={18} className="sm:size-5 animate-pulse" />
                </div>
                
                <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-black text-gray-900 uppercase tracking-tight truncate pr-2">
                        {term || "Concept Explained"}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                        <FaMagic className="text-emerald-500" size={10} />
                        {/* Gradient AI Badge */}
                        <span className="text-[9px] sm:text-[10px] font-black bg-linear-to-r from-emerald-500 to-teal-500 text-transparent bg-clip-text uppercase tracking-widest leading-none">
                            AI Breakdown
                        </span>
                    </div>
                </div>
            </div>

            <button
                onClick={onClose}
                className="p-2.5 sm:p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl sm:rounded-2xl transition-all shrink-0 active:scale-95 bg-gray-50 sm:bg-transparent"
            >
                <FaTimes size={14} className="sm:size-5" />
            </button>
        </div>

        {/* Body Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-10 bg-gray-50/50">
            <div className="max-w-none w-full flex flex-col gap-4">
                
                <p className="flex items-center gap-2 text-gray-400 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] px-2">
                    <FaBookOpen size={12} className="text-gray-300" /> 
                    {docTitle || "Current Document"}
                </p>

                {/* The Reading Box UI */}
                <div className="bg-white border border-emerald-100/60 rounded-4xl p-6 sm:p-8 shadow-sm shadow-emerald-500/5 relative overflow-hidden">
                    
                    {/* Decorative background blur element */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full blur-3xl pointer-events-none" />
                    
                    {/* Markdown Renderer with Tailwind Prose */}
                    <div className="prose prose-sm sm:prose-base prose-emerald max-w-none relative z-10
                        prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-gray-800
                        prose-p:text-gray-600 prose-p:leading-relaxed prose-p:font-medium
                        prose-strong:text-emerald-700 prose-strong:font-black
                        prose-ul:list-disc prose-ul:pl-5
                        prose-li:text-gray-600 marker:text-emerald-500"
                    >
                        <ReactMarkdown>{explanation}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer Actions - Sticky */}
        <div className="px-5 py-4 sm:px-10 sm:py-6 border-t border-gray-100 bg-white sticky bottom-0 z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 sm:pb-6">
            
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] text-center sm:text-left w-full sm:w-auto hidden sm:block">
                Generated by Gemini
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                    onClick={copyToClipboard}
                    className={clsx(
                        "flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 rounded-2xl text-[10px] font-black uppercase transition-all shadow-sm border active:scale-95",
                        copied
                            ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                            : "bg-white text-gray-600 hover:text-emerald-600 border-gray-200 hover:border-emerald-200"
                    )}
                >
                    {copied ? <FaCheck size={12} className="text-emerald-500" /> : <FaRegCopy size={12} />}
                    <span className="truncate tracking-wider">{copied ? "Copied!" : "Copy Text"}</span>
                </button>

                <button
                    onClick={onClose}
                    className="flex-2 sm:flex-none px-8 py-3.5 sm:py-3 bg-gray-900 text-white text-[10px] font-black uppercase tracking-wider rounded-2xl hover:bg-black transition-all shadow-lg shadow-gray-900/20 active:scale-95"
                >
                    Done Reading
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ExplainModal;