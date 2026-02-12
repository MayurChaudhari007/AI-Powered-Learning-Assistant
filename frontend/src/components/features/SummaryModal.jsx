
import React, { useState } from "react";
import { FaTimes, FaListAlt, FaRegCopy, FaCheck, FaCircle } from "react-icons/fa";
import clsx from "clsx";

const SummaryModal = ({ isOpen, onClose, summary, docTitle }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // 1. IMPROVED: More robust splitting and cleaning
  const getBulletPoints = (text) => {
    if (!text) return [];
    
    // Split by bullets or by newlines/sentence ends to ensure we get a list
    return text
      .split(/[•\*\n]/) 
      .map(item => item.trim())
      .filter(item => item.length > 10);
  };

  const points = getBulletPoints(summary);

  const copyToClipboard = () => {
    if (!summary) return;
    const cleanText = points.map(p => `• ${p}`).join('\n');
    navigator.clipboard.writeText(cleanText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="px-6 py-5 md:px-10 md:py-8 border-b border-gray-50 flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-sm">
              <FaListAlt size={20} />
            </div>
            <div>
              <h3 className="text-sm md:text-base font-black text-gray-900 uppercase tracking-tight line-clamp-1">
                {docTitle || "Document Summary"}
              </h3>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] md:text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                  AI Knowledge Breakdown
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-300 hover:text-gray-900 transition-colors">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Body - Switched to Manual Mapping for perfect UI control */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 bg-white scrollbar-hide">
          <div className="space-y-8">
            {points.map((point, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 animate-in slide-in-from-left duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Custom Emerald Bullet Icon */}
                <div className="mt-1.5 shrink-0">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.6)]" />
                </div>
                
                {/* Point Content */}
                <p className="text-gray-700 text-sm md:text-base leading-relaxed font-semibold">
                  {point}
                </p>
              </div>
            ))}

            {points.length === 0 && (
              <p className="text-center text-gray-400 font-medium py-10">
                No key points found. Try regenerating the summary.
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 md:px-10 md:py-8 border-t border-gray-50 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {points.length} Key Points 
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={copyToClipboard}
              className={clsx(
                "flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase transition-all shadow-sm border",
                copied 
                  ? "bg-emerald-600 text-white border-emerald-600" 
                  : "bg-white text-gray-600 border-gray-200 hover:border-emerald-500 hover:text-emerald-600"
              )}
            >
              {copied ? <FaCheck /> : <FaRegCopy />}
              {copied ? "Copied" : "Copy Content"}
            </button>

            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-10 py-3 bg-gray-900 text-white text-[10px] font-black uppercase rounded-2xl hover:bg-black transition-all shadow-lg shadow-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryModal;