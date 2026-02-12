// import React, { useState, useEffect } from "react";
// import {
//   FaBrain,
//   FaPlus,
//   FaSpinner,
//   FaLayerGroup,
//   FaExclamationCircle,
// } from "react-icons/fa";
// import api from "../../api/axios";
// import FlashcardSetCard from "./FlashcardSetCard";
// import FlashcardViewer from "./FlashcardViewer";
// import DeleteConfirmModal from "./DeleteConfirmModal";

// const FlashcardSection = ({ documentId }) => {
//   // --- 1. State Management ---
//   const [sets, setSets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [generating, setGenerating] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [error, setError] = useState(null);

//   // View state for switching to the Study Modal
//   const [viewingSet, setViewingSet] = useState(null);

//   // Modal state for deletion
//   const [deleteModal, setDeleteModal] = useState({
//     isOpen: false,
//     setId: null,
//     setTitle: "",
//   });

//   // --- 2. Data Fetching ---
//   useEffect(() => {
//     const fetchSets = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await api.get(`/flashcards/document/${documentId}`);
//         setSets(response.data);
//       } catch (err) {
//         console.error("Failed to load flashcards:", err);
//         setError("Could not load your study sets. Please refresh.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (documentId) fetchSets();
//   }, [documentId]);

//   // --- 3. Action Handlers ---

//   // Handle AI Generation
//   const handleGenerate = async () => {
//     setGenerating(true);
//     setError(null);
//     try {
//       const response = await api.post("/flashcards/generate", {
//         documentId,
//         title: `Set #${sets.length + 1}`,
//       });
//       // Add new set to the top of the list
//       setSets((prev) => [response.data, ...prev]);
//     } catch (err) {
//       console.error("Generation failed:", err);
//       setError("AI generation failed. The server might be busy.");
//     } finally {
//       setGenerating(false);
//     }
//   };

//   // Final confirmation of deletion
//   const handleConfirmDelete = async () => {
//     setIsDeleting(true);
//     try {
//       await api.delete(`/flashcards/${deleteModal.setId}`);

//       // Filter out the deleted set from local state
//       setSets((prev) => prev.filter((s) => s._id !== deleteModal.setId));

//       // Close modal
//       setDeleteModal({ isOpen: false, setId: null, setTitle: "" });
//     } catch (err) {
//       console.error("Delete failed:", err);
//       alert("Failed to delete the set. Please try again.");
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   // --- 4. Render Logic ---

//   // Study Mode Switcher
//   if (viewingSet) {
//     return (
//       <div className="animate-in fade-in zoom-in-95 duration-300">
//         <FlashcardViewer set={viewingSet} onBack={() => setViewingSet(null)} />
//       </div>
//     );
//   }

//   // Loading State
//   if (loading) {
//     return (
//       <div className="h-96 flex flex-col items-center justify-center space-y-4">
//         <div className="relative">
//           <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
//           <FaBrain className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500 text-xs" />
//         </div>
//         <p className="text-xs font-black text-gray-400 uppercase tracking-widest animate-pulse">
//           Syncing Study Sets
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="h-full flex flex-col space-y-6">
//       {/* Error Alert */}
//       {error && (
//         <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold animate-in slide-in-from-top-2">
//           <FaExclamationCircle />
//           {error}
//         </div>
//       )}

//       {/* Header Section */}
//       <div className="flex items-center justify-between bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
//         <div className="flex items-center gap-4">
//           <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-500 shadow-sm">
//             <FaLayerGroup size={18} />
//           </div>
//           <div>
//             <h3 className="text-xs font-black text-gray-900 uppercase tracking-tight">
//               Document Flashcards
//             </h3>
//             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
//               {sets.length} {sets.length === 1 ? "Set" : "Sets"} Available
//             </p>
//           </div>
//         </div>

//         <button
//           onClick={handleGenerate}
//           disabled={generating}
//           className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white text-[10px] font-black uppercase rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 disabled:opacity-50 active:scale-95"
//         >
//           {generating ? <FaSpinner className="animate-spin" /> : <FaPlus />}
//           {generating ? "AI Thinking..." : "New Study Set"}
//         </button>
//       </div>

//       {/* Grid Display */}
//       <div className="flex-1">
//         {sets.length === 0 ? (
//           <div className="h-96 flex flex-col items-center justify-center text-center p-8 bg-white rounded-4xl border-2 border-dashed border-gray-100">
//             <div className="bg-emerald-50 p-10 rounded-full mb-6 rotate-3">
//               <FaBrain className="text-5xl text-emerald-500 opacity-40" />
//             </div>
//             <h3 className="text-xl font-black text-gray-900 uppercase">
//               No Flashcards Yet
//             </h3>
//             <p className="text-xs text-gray-400 font-bold max-w-xs mt-2 uppercase tracking-tight">
//               Ready to learn? Click "New Study Set" to generate cards from this
//               PDF.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
//             {sets.map((set) => (
//               <FlashcardSetCard
//                 key={set._id}
//                 set={set}
//                 onSelect={() => setViewingSet(set)}
//                 onDelete={() =>
//                   setDeleteModal({
//                     isOpen: true,
//                     setId: set._id,
//                     setTitle: set.title,
//                   })
//                 }
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Delete Confirmation Overlay */}
//       <DeleteConfirmModal
//         isOpen={deleteModal.isOpen}
//         docTitle={deleteModal.setTitle}
//         isDeleting={isDeleting}
//         onClose={() =>
//           setDeleteModal({ isOpen: false, setId: null, setTitle: "" })
//         }
//         onConfirm={handleConfirmDelete}
//       />
//     </div>
//   );
// };

// export default FlashcardSection;


import React, { useState, useEffect } from "react";
import {
  FaBrain,
  FaPlus,
  FaSpinner,
  FaLayerGroup,
  FaExclamationCircle,
} from "react-icons/fa";
import api from "../../api/axios";
import FlashcardSetCard from "./FlashcardSetCard";
import FlashcardViewer from "./FlashcardViewer";
import DeleteConfirmModal from "./DeleteConfirmModal";

const FlashcardSection = ({ documentId }) => {
  // --- 1. State Management ---
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  // View state for switching to the Study Modal
  const [viewingSet, setViewingSet] = useState(null);

  // Modal state for deletion
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    setId: null,
    setTitle: "",
  });

  // --- 2. Data Fetching ---
  useEffect(() => {
    const fetchSets = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/flashcards/document/${documentId}`);
        setSets(response.data);
      } catch (err) {
        console.error("Failed to load flashcards:", err);
        setError("Could not load study sets. Please refresh.");
      } finally {
        setLoading(false);
      }
    };
    if (documentId) fetchSets();
  }, [documentId]);

  // --- 3. Action Handlers ---

  const handleGenerate = async () => {
    setGenerating(true);
    setError(null);
    try {
      const response = await api.post("/flashcards/generate", {
        documentId,
        title: `Set #${sets.length + 1}`,
      });
      setSets((prev) => [response.data, ...prev]);
    } catch (err) {
      console.error("Generation failed:", err);
      setError("AI generation failed. Server might be busy.");
    } finally {
      setGenerating(false);
    }
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await api.delete(`/flashcards/${deleteModal.setId}`);
      setSets((prev) => prev.filter((s) => s._id !== deleteModal.setId));
      setDeleteModal({ isOpen: false, setId: null, setTitle: "" });
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete the set. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // --- 4. Render Logic ---

  if (viewingSet) {
    return (
      <div className="animate-in fade-in zoom-in-95 duration-300">
        <FlashcardViewer set={viewingSet} onBack={() => setViewingSet(null)} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-64 md:h-96 flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
          <FaBrain className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500 text-[10px]" />
        </div>
        <p className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest animate-pulse">
          Syncing Study Sets
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-4 md:space-y-6">
      {/* Error Alert */}
      {error && (
        <div className="p-3 md:p-4 bg-red-50 border border-red-100 rounded-xl md:rounded-2xl flex items-center gap-3 text-red-600 text-[10px] md:text-xs font-bold animate-in slide-in-from-top-2">
          <FaExclamationCircle className="shrink-0" />
          <span className="truncate">{error}</span>
        </div>
      )}

      {/* Header Section - Responsive Flex */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between bg-white p-4 md:p-6 rounded-2xl md:rounded-4xl border border-gray-100 shadow-sm gap-4">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="p-2.5 md:p-3 bg-emerald-50 rounded-xl md:rounded-2xl text-emerald-500 shadow-sm shrink-0">
            <FaLayerGroup size={16} className="md:size-4.5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-[10px] md:text-xs font-black text-gray-900 uppercase tracking-tight leading-none">
              Document Flashcards
            </h3>
            <p className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase mt-1">
              {sets.length} {sets.length === 1 ? "Set" : "Sets"} Available
            </p>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="flex items-center justify-center gap-2 px-6 py-3.5 md:py-3 bg-emerald-600 text-white text-[9px] md:text-[10px] font-black uppercase rounded-xl md:rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 active:scale-95"
        >
          {generating ? <FaSpinner className="animate-spin" /> : <FaPlus size={10} />}
          <span>{generating ? "AI Thinking..." : "New Study Set"}</span>
        </button>
      </div>

      {/* Grid Display */}
      <div className="flex-1">
        {sets.length === 0 ? (
          <div className="h-64 md:h-96 flex flex-col items-center justify-center text-center p-6 md:p-8 bg-white rounded-3xl md:rounded-4xl border-2 border-dashed border-gray-100">
            <div className="bg-emerald-50 p-6 md:p-10 rounded-full mb-4 md:mb-6 rotate-3">
              <FaBrain className="text-3xl md:text-5xl text-emerald-500 opacity-40" />
            </div>
            <h3 className="text-base md:text-xl font-black text-gray-900 uppercase">
              No Flashcards Yet
            </h3>
            <p className="text-[10px] md:text-xs text-gray-400 font-bold max-w-50 md:max-w-xs mt-2 uppercase tracking-tight mx-auto">
              Ready to learn? Generate cards from this PDF.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {sets.map((set) => (
              <FlashcardSetCard
                key={set._id}
                set={set}
                onSelect={() => setViewingSet(set)}
                onDelete={() =>
                  setDeleteModal({
                    isOpen: true,
                    setId: set._id,
                    setTitle: set.title,
                  })
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Overlay */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        docTitle={deleteModal.setTitle}
        isDeleting={isDeleting}
        onClose={() =>
          setDeleteModal({ isOpen: false, setId: null, setTitle: "" })
        }
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default FlashcardSection;