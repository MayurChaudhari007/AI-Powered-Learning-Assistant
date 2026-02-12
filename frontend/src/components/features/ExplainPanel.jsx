// import React, { useState, useEffect } from "react";
// import {
//   FaLightbulb,
//   FaSpinner,
//   FaMagic,
//   FaRegCompass,
//   FaHistory,
// } from "react-icons/fa";
// import api from "../../api/axios";
// import HistoryCard from "./HistoryCard";
// import ExplainModal from "./ExplainModal";

// const ExplainPanel = ({ documentId, docTitle }) => {
//   const [concept, setConcept] = useState("");
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);
//   const [selectedConcept, setSelectedConcept] = useState(null); // Controls the Modal
//   const [error, setError] = useState(null);

//   // 1. Fetch History on Load
//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const response = await api.get(`/ai/concepts/${documentId}`);
//         setHistory(response.data);
//       } catch (err) {
//         console.error("Failed to load concept history:", err);
//       } finally {
//         setInitialLoading(false);
//       }
//     };
//     fetchHistory();
//   }, [documentId]);

//   // 2. Handle New Search with Error Protection
//   // const handleExplain = async (e) => {
//   //   if (e) e.preventDefault();
//   //   if (!concept.trim() || loading) return;

//   //   setLoading(true);
//   //   setError(null);

//   //   try {
//   //     const response = await api.post("/ai/explain", { documentId, concept });

//   //     // Safety Check: Ensure the server returned a valid object
//   //     if (response.data && response.data.explanation) {
//   //       const newEntry = response.data;

//   //       // Update local history (Move to top if duplicate found)
//   //       setHistory((prev) => {
//   //         const filtered = prev.filter(
//   //           (item) => item.term.toLowerCase() !== concept.toLowerCase()
//   //         );
//   //         return [newEntry, ...filtered];
//   //       });

//   //       // Force the modal to open with the fresh data
//   //       setSelectedConcept(newEntry);
//   //       setConcept("");
//   //     } else {
//   //       throw new Error("Invalid AI Response");
//   //     }
//   //   } catch (err) {
//   //     console.error("Explanation failed:", err);
//   //     // Specific handling for 500 and 429 errors
//   //     if (err.response?.status === 429) {
//   //       setError("AI is busy (Rate Limit). Try again in a minute.");
//   //     } else if (err.response?.status === 500) {
//   //       setError("AI server error. Try a different concept or refresh.");
//   //     } else {
//   //       setError("Failed to generate explanation. Check your connection.");
//   //     }
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   // Updated handleExplain with a "Pre-check" logic

//   // const handleExplain = async (e) => {
//   //   if (e) e.preventDefault();
//   //   const cleanConcept = concept.trim().toLowerCase();
//   //   if (!cleanConcept || loading) return;

//   //   setLoading(true);
//   //   setError(null);

//   //   // 1. Check if it already exists in history to avoid redundant 500s
//   //   const existing = history.find((h) => h.term.toLowerCase() === cleanConcept);
//   //   if (existing) {
//   //     setSelectedConcept(existing);
//   //     setLoading(false);
//   //     setConcept("");
//   //     return;
//   //   }

//   //   try {
//   //     const response = await api.post("/ai/explain", { documentId, concept });

//   //     if (response.data && response.data.explanation) {
//   //       setHistory((prev) => [
//   //         response.data,
//   //         ...prev.filter((h) => h.term !== response.data.term),
//   //       ]);
//   //       setSelectedConcept(response.data);
//   //       setConcept("");
//   //     }
//   //   } catch (err) {
//   //     if (err.response?.status === 500) {
//   //       try {
//   //         const recovery = await api.get(`/ai/concepts/${documentId}`);
//   //         const found = recovery.data.find(
//   //           (h) => h.term.toLowerCase() === cleanConcept,
//   //         );
//   //         if (found) {
//   //           setHistory(recovery.data);
//   //           setSelectedConcept(found);
//   //           setConcept("");
//   //           return;
//   //         }
//   //       } catch (recoveryErr) {
//   //         console.error("Recovery failed");
//   //       }
//   //     }
//   //     setError("AI generation failed. Please try a different term.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // const handleExplain = async (e) => {
//   //   if (e) e.preventDefault();
//   //   if (!concept.trim() || loading) return;

//   //   setLoading(true);
//   //   setError(null);

//   //   try {
//   //     const response = await api.post("/ai/explain", { documentId, concept });

//   //     const newEntry = response.data;

//   //     // Update local history (Move to top if duplicate found)
//   //     setHistory((prev) => {
//   //       const filtered = prev.filter(
//   //         (item) => item.term.toLowerCase() !== concept.toLowerCase(),
//   //       );
//   //       return [newEntry, ...filtered];
//   //     });

//   //     // Automatically open the Modal with the new explanation
//   //     setSelectedConcept(newEntry);
//   //     setConcept("");
//   //   } catch (err) {
//   //     // Handle Quota/Network errors gracefully
//   //     setError(
//   //       err.response?.status === 429
//   //         ? "AI is busy (Rate Limit). Try again in a minute."
//   //         : "Failed to generate explanation. Please try again.",
//   //     );
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const handleExplain = async (e) => {
//     if (e) e.preventDefault();
//     const cleanConcept = concept.trim();
//     const lowerConcept = cleanConcept.toLowerCase();

//     if (!cleanConcept || loading) return;

//     setLoading(true);
//     setError(null);

//     // 1. Pre-check: Don't call AI if we already have it in the list
//     const existing = history.find((h) => h.term.toLowerCase() === lowerConcept);
//     if (existing) {
//       setSelectedConcept(existing);
//       setLoading(false);
//       setConcept("");
//       return;
//     }

//     try {
//       const response = await api.post("/ai/explain", {
//         documentId,
//         concept: cleanConcept,
//       });

//       if (response.data && response.data.explanation) {
//         // FIX: Ensure newEntry has a valid date for the HistoryCard
//         const newEntry = {
//           ...response.data,
//           createdAt: response.data.createdAt || new Date().toISOString(),
//         };

//         setHistory((prev) => [
//           newEntry,
//           ...prev.filter((h) => h.term.toLowerCase() !== lowerConcept),
//         ]);
//         setSelectedConcept(newEntry);
//         setConcept("");
//       }
//     } catch (err) {
//       console.error("Explain Request Failed:", err);

//       // 2. RECOVERY LOGIC: If 500 happens, the server might have saved it but timed out
//       if (err.response?.status === 500) {
//         try {
//           // Wait 1 second for DB to settle, then fetch latest
//           await new Promise((resolve) => setTimeout(resolve, 1000));
//           const recovery = await api.get(`/ai/concepts/${documentId}`);
//           const found = recovery.data.find(
//             (h) => h.term.toLowerCase() === lowerConcept,
//           );

//           if (found) {
//             setHistory(recovery.data);
//             setSelectedConcept(found);
//             setConcept("");
//             return; // Success found in DB!
//           }
//         } catch (recoveryErr) {
//           console.error("Recovery fetch failed");
//         }
//       }

//       // 3. Final Error State
//       setError(
//         err.response?.status === 429
//           ? "AI is busy (Rate Limit). Try again in a minute."
//           : "AI timed out. Please refresh or check history below.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };
//   if (initialLoading) {
//     return (
//       <div className="h-48 md:h-full flex flex-col items-center justify-center space-y-3">
//         <FaSpinner className="animate-spin text-amber-500 text-lg md:text-xl" />
//         <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">
//           Syncing Knowledge
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col h-full bg-white rounded-3xl md:rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
//       {/* Search Header - Responsive Padding */}
//       <div className="p-5 md:p-8 bg-white border-b border-gray-50 z-10">
//         <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
//           <div className="p-2 md:p-2.5 bg-amber-50 rounded-xl text-amber-500 shadow-sm">
//             <FaLightbulb size={16} className="md:size-5" />
//           </div>
//           <div>
//             <h3 className="text-[10px] md:text-xs font-black text-gray-900 uppercase tracking-wider leading-none">
//               Concept Explainer
//             </h3>
//             <p className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase mt-1">
//               Instant 5-Line Breakdowns
//             </p>
//           </div>
//         </div>

//         <form onSubmit={handleExplain} className="relative group">
//           <input
//             type="text"
//             value={concept}
//             onChange={(e) => setConcept(e.target.value)}
//             placeholder="Search a topic..."
//             className="w-full pl-4 pr-12 py-3.5 md:pl-6 md:pr-14 md:py-4 bg-gray-50 border-2 border-transparent rounded-xl md:rounded-2xl text-xs md:text-sm font-bold shadow-inner focus:bg-white focus:border-emerald-500 transition-all outline-none"
//             disabled={loading}
//           />
//           <button
//             type="submit"
//             disabled={!concept.trim() || loading}
//             className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2.5 md:p-3 bg-emerald-600 text-white rounded-lg md:rounded-xl hover:bg-emerald-700 disabled:opacity-30 transition-all active:scale-95 shadow-md shadow-emerald-50"
//           >
//             {loading ? (
//               <FaSpinner className="animate-spin text-sm" />
//             ) : (
//               <FaMagic size={12} className="md:size-3.5" />
//             )}
//           </button>
//         </form>
//       </div>

//       {/* Scrollable History Area */}
//       <div className="flex-1 overflow-y-auto p-5 md:p-8 scrollbar-hide bg-[#fafafa]/50">
//         <div className="flex items-center gap-2 mb-4 md:mb-6 opacity-40">
//           <FaHistory size={10} />
//           <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">
//             Previous Lookups
//           </span>
//         </div>

//         {error && (
//           <div className="mb-4 p-3 md:p-4 bg-red-50 text-red-700 text-[9px] md:text-[10px] font-black uppercase rounded-xl md:rounded-2xl border border-red-100 animate-in fade-in leading-tight">
//             ⚠️ {error}
//           </div>
//         )}

//         {history.length === 0 && !loading ? (
//           <div className="h-32 md:h-40 flex flex-col items-center justify-center text-center space-y-3 md:space-y-4 opacity-40">
//             <FaRegCompass className="text-4xl md:text-5xl text-amber-200" />
//             <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase max-w-45 mx-auto">
//               Empty history. Search above to begin.
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-1">
//             {history.map((item, index) => (
//               <HistoryCard
//                 key={item._id || index}
//                 item={item}
//                 onSelect={(data) => setSelectedConcept(data)}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Pop-up Modal */}
//       {selectedConcept && (
//         <ExplainModal
//           isOpen={!!selectedConcept}
//           onClose={() => setSelectedConcept(null)}
//           term={selectedConcept.term}
//           explanation={selectedConcept.explanation}
//           docTitle={docTitle}
//         />
//       )}
//     </div>
//   );
// };

// export default ExplainPanel;











import React, { useState, useEffect } from "react";
import {
  FaLightbulb,
  FaSpinner,
  FaMagic,
  FaRegCompass,
  FaHistory,
} from "react-icons/fa";
import api from "../../api/axios";
import HistoryCard from "./HistoryCard";
import ExplainModal from "./ExplainModal";

const ExplainPanel = ({ documentId, docTitle }) => {
  const [concept, setConcept] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    try {
      const response = await api.get(`/ai/concepts/${documentId}`);
      setHistory(response.data);
      return response.data;
    } catch (err) {
      console.error("Failed to load history:", err);
      return [];
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [documentId]);

  const handleExplain = async (e) => {
    if (e) e.preventDefault();
    const cleanConcept = concept.trim();
    if (!cleanConcept || loading) return;

    setLoading(true);
    setError(null);

    try {
      // 1. Attempt the AI call
      const response = await api.post("/ai/explain", { documentId, concept: cleanConcept });
      
      if (response.data && response.data.explanation) {
        const newEntry = {
          ...response.data,
          createdAt: response.data.createdAt || new Date().toISOString()
        };
        setHistory(prev => [newEntry, ...prev.filter(h => h.term.toLowerCase() !== cleanConcept.toLowerCase())]);
        setSelectedConcept(newEntry);
        setConcept("");
      }
    } catch (err) {
      // 2. SILENT RECOVERY: If 500 occurs, check if it was actually saved
      console.warn("Server reported 500, attempting recovery...");
      
      // Brief delay to allow DB to finish the save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const refreshedHistory = await fetchHistory();
      const found = refreshedHistory.find(
        (h) => h.term.toLowerCase() === cleanConcept.toLowerCase()
      );

      if (found) {
        // If found, it means the 500 was a false alarm
        setSelectedConcept(found);
        setConcept("");
      } else {
        // Only show error if it's truly missing from DB
        setError("AI server is busy. If it doesn't appear in history, please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="h-48 md:h-full flex flex-col items-center justify-center space-y-3">
        <FaSpinner className="animate-spin text-amber-500 text-lg md:text-xl" />
        <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">Syncing Knowledge</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl md:rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-5 md:p-8 bg-white border-b border-gray-50 z-10">
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
          <div className="p-2 md:p-2.5 bg-amber-50 rounded-xl text-amber-500 shadow-sm shrink-0">
            <FaLightbulb size={16} className="md:size-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-[10px] md:text-xs font-black text-gray-900 uppercase tracking-wider leading-none truncate">Concept Explainer</h3>
            <p className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase mt-1">Instant Breakdowns</p>
          </div>
        </div>

        <form onSubmit={handleExplain} className="relative group">
          <input
            type="text"
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            placeholder="Search topic..."
            className="w-full pl-4 pr-12 py-3.5 md:pl-6 md:pr-14 md:py-4 bg-gray-50 border-2 border-transparent rounded-xl md:rounded-2xl text-xs md:text-sm font-bold focus:bg-white focus:border-emerald-500 transition-all outline-none"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!concept.trim() || loading}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2.5 md:p-3 bg-emerald-600 text-white rounded-lg md:rounded-xl hover:bg-emerald-700 disabled:opacity-30 transition-all active:scale-95 shadow-md"
          >
            {loading ? <FaSpinner className="animate-spin text-sm" /> : <FaMagic size={12} className="md:size-3.5" />}
          </button>
        </form>
      </div>

      <div className="flex-1 overflow-y-auto p-5 md:p-8 scrollbar-hide bg-[#fafafa]/50">
        <div className="flex items-center gap-2 mb-4 md:mb-6 opacity-40">
            <FaHistory size={10} />
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">Previous Lookups</span>
        </div>

        {error && (
          <div className="mb-4 p-3 md:p-4 bg-red-50 text-red-700 text-[9px] md:text-[10px] font-black uppercase rounded-xl md:rounded-2xl border border-red-100 animate-in fade-in leading-tight">
              ⚠️ {error}
          </div>
        )}

        {history.length === 0 && !loading ? (
          <div className="h-32 md:h-40 flex flex-col items-center justify-center text-center space-y-3 opacity-40">
            <FaRegCompass className="text-4xl md:text-5xl text-amber-200" />
            <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase max-w-37.5  mx-auto">No history yet.</p>
          </div>
        ) : (
          <div className="space-y-1">
            {history.map((item, index) => (
              <HistoryCard key={item._id || index} item={item} onSelect={(data) => setSelectedConcept(data)} />
            ))}
          </div>
        )}
      </div>

      {selectedConcept && (
        <ExplainModal
          isOpen={!!selectedConcept}
          onClose={() => setSelectedConcept(null)}
          term={selectedConcept.term}
          explanation={selectedConcept.explanation}
          docTitle={docTitle}
        />
      )}
    </div>
  );
};

export default ExplainPanel;