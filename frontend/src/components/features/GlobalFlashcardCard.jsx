import React from "react";
import { FaLayerGroup, FaTrash, FaPlay, FaFolderOpen, FaClock } from "react-icons/fa";

const GlobalFlashcardCard = ({ set, onSelect, onDelete }) => {
  // Extract document title from the populated object
  const docTitle = set.document?.title || "Untitled Document";

  return (
    <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
      {/* 1. Header: Document Badge & Delete */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-xl border border-emerald-100/50">
          <FaFolderOpen className="text-emerald-500 text-[10px]" />
          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter truncate max-w-30">
            {docTitle}
            {/* {set.title} */}
          </span>
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(set._id, set.title); }}
          className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
        >
          <FaTrash size={12} />
        </button>
      </div>

      {/* 2. Set Info */}
      <div className="space-y-3 mb-8">
        <div className="p-3 bg-gray-50 w-fit rounded-2xl text-gray-400 group-hover:text-emerald-500 group-hover:bg-emerald-50 transition-colors">
          <FaLayerGroup size={20} />
        </div>
        <div>
          <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight truncate">
            {set.title}
          </h4>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1 text-[9px] font-bold text-gray-400 uppercase">
              <FaClock size={8} /> {new Date(set.createdAt).toLocaleDateString()}
            </span>
            <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md uppercase">
              {set.cards?.length || 0} Cards
            </span>
          </div>
        </div>
      </div>

      {/* 3. Action Button */}
      <button 
        onClick={onSelect}
        className="w-full py-4 bg-gray-900 text-white text-[10px] font-black uppercase rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-lg active:scale-95"
      >
        <FaPlay size={10} /> Start Studying
      </button>

      {/* Decorative background element */}
      {/* <div className="absolute -bottom-2 -right-2 text-gray-50 opacity-10 group-hover:text-emerald-100 group-hover:opacity-20 transition-all">
        <FaLayerGroup size={80} />
      </div> */}
    </div>
  );
};

export default GlobalFlashcardCard;