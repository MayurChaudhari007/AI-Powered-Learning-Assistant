// import React from "react";
// import { FaBrain, FaTrash, FaPlay } from "react-icons/fa";

// const FlashcardSetCard = ({ set, onSelect, onDelete }) => {
//   return (
//     <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative">
//       <div className="flex justify-between items-start mb-6">
//         <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
//           <FaBrain size={24} />
//         </div>
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             onDelete();
//           }}
//           className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
//         >
//           <FaTrash size={14} />
//         </button>
//       </div>

//       <div className="space-y-1 mb-8">
//         <h4 className="text-lg font-black text-gray-900 truncate uppercase tracking-tight">
//           {set.title}
//         </h4>
//         <div className="flex items-center gap-2">
//           <span className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-black rounded-full uppercase">
//             {set.cards.length} Cards
//           </span>
//           <span className="text-[10px] font-bold text-gray-300 uppercase">
//             {new Date(set.createdAt).toLocaleDateString()}
//           </span>
//         </div>
//       </div>

//       <button
//         onClick={onSelect}
//         className="w-full py-4 bg-gray-900 text-white text-[10px] font-black uppercase rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-gray-100 group-hover:shadow-emerald-100"
//       >
//         <FaPlay /> Start Studying
//       </button>
//     </div>
//   );
// };

// export default FlashcardSetCard;




import React from "react";
import { FaBrain, FaTrash, FaPlay } from "react-icons/fa";

const FlashcardSetCard = ({ set, onSelect, onDelete }) => {
  return (
    <div className="bg-white p-5 md:p-6 rounded-4xl md:rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative">
      {/* Top Section: Icon and Delete */}
      <div className="flex justify-between items-start mb-4 md:mb-6">
        <div className="p-3 md:p-4 bg-emerald-50 rounded-xl md:rounded-2xl text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
          <FaBrain size={20} className="md:size-6" />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-2.5 md:p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90"
        >
          <FaTrash size={12} className="md:size-3.5" />
        </button>
      </div>

      {/* Info Section */}
      <div className="space-y-1 mb-6 md:mb-8">
        <h4 className="text-base md:text-lg font-black text-gray-900 truncate uppercase tracking-tight">
          {set.title}
        </h4>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-gray-100 text-gray-500 text-[9px] md:text-[10px] font-black rounded-full uppercase">
            {set.cards.length} Cards
          </span>
          <span className="text-[9px] md:text-[10px] font-bold text-gray-400 md:text-gray-300 uppercase tracking-tight">
            {new Date(set.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onSelect}
        className="w-full py-3.5 md:py-4 bg-gray-900 text-white text-[9px] md:text-[10px] font-black uppercase rounded-xl md:rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-gray-100 group-hover:shadow-emerald-100 active:scale-95"
      >
        <FaPlay size={10} /> Start Studying
      </button>
    </div>
  );
};

export default FlashcardSetCard;