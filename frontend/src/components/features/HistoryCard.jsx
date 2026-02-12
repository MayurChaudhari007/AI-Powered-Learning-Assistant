// import React from "react";
// import { FaChevronRight, FaRegClock } from "react-icons/fa";

// const HistoryCard = ({ item, onSelect }) => {
//   // Helper for short date format
//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//     });
//   };

//   return (
//     <button
//       onClick={() => onSelect(item)}
//       className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-200 group text-left shadow-sm mb-3"
//     >
//       <div className="flex items-center gap-4 overflow-hidden">
//         <div className="w-1.5 h-8 bg-amber-400 rounded-full shrink-0 group-hover:bg-emerald-500 transition-colors" />
//         <div className="overflow-hidden">
//           <h4 className="text-sm font-bold text-gray-900 truncate capitalize">
//             {item.term}
//           </h4>
//           <div className="flex items-center gap-2 mt-0.5">
//             <FaRegClock size={8} className="text-gray-400" />
//             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
//               {formatDate(item.createdAt)}
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="p-2 bg-gray-50 rounded-lg text-gray-300 group-hover:text-emerald-500 group-hover:bg-white transition-all shadow-sm">
//         <FaChevronRight size={10} />
//       </div>
//     </button>
//   );
// };

// export default HistoryCard;




import React from "react";
import { FaChevronRight, FaRegClock } from "react-icons/fa";

const HistoryCard = ({ item, onSelect }) => {
  // Helper for short date format
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <button
      onClick={() => onSelect(item)}
      className="w-full flex items-center justify-between p-3 md:p-4 bg-white border border-gray-100 rounded-xl md:rounded-2xl hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-200 group text-left shadow-sm mb-2 md:mb-3 active:scale-[0.98] lg:active:scale-100"
    >
      <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
        {/* Active Indicator Strip */}
        <div className="w-1 h-6 md:w-1.5 md:h-8 bg-amber-400 rounded-full shrink-0 group-hover:bg-emerald-500 transition-colors" />
        
        <div className="overflow-hidden min-w-0">
          <h4 className="text-xs md:text-sm font-bold text-gray-900 truncate capitalize">
            {item.term}
          </h4>
          <div className="flex items-center gap-1.5 md:gap-2 mt-0.5 md:mt-1">
            <FaRegClock size={8} className="text-gray-400 shrink-0" />
            <span className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">
              {formatDate(item.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-1.5 md:p-2 bg-gray-50 rounded-lg text-gray-300 group-hover:text-emerald-500 group-hover:bg-white transition-all shadow-sm shrink-0">
        <FaChevronRight size={10} className="md:size-3" />
      </div>
    </button>
  );
};

export default HistoryCard;