import React, { useEffect, useState } from "react";
import {
  FaSpinner,
  FaBrain,
  FaPlus,
  FaSearch,
  FaHistory,
  FaExclamationCircle
} from "react-icons/fa";
import api from "../api/axios";
import { Link } from "react-router-dom";
import GlobalFlashcardCard from "../components/features/GlobalFlashcardCard"; // Using the new specialized component
import FlashcardViewer from "../components/features/FlashcardViewer";
import DeleteConfirmModal from "../components/features/DeleteConfirmModal";

const FlashcardList = () => {
  // --- 1. State Management ---
  const [loading, setLoading] = useState(true);
  const [allSets, setAllSets] = useState([]); 
  const [viewingSet, setViewingSet] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  // const docTitle = set.document?.title || "Untitled Document";
  // Modal State for Deletion
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: null,
    title: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);

  // --- 2. Data Fetching ---
  const fetchAllSets = async () => {
    setLoading(true);
    setError(null);
    try {
      // Calls the new backend route we created
      const response = await api.get("/flashcards/all");
      setAllSets(response.data);
    } catch (err) {
      console.error("Error fetching library:", err);
      setError("Failed to load your study library. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSets();
  }, []);

  // --- 3. Handlers ---
  const handleOpenDelete = (id, title) => {
    setDeleteModal({ isOpen: true, id, title });
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await api.delete(`/flashcards/${deleteModal.id}`);
      // Optimistic Update: Remove from UI immediately
      setAllSets((prev) => prev.filter((s) => s._id !== deleteModal.id));
      setDeleteModal({ isOpen: false, id: null, title: "" });
    } catch (err) {
      alert("Could not delete set. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // --- 4. Search/Filter Logic ---
  const filteredSets = allSets.filter((set) =>
    set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    set.document?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- 5. Render Logic ---

  // Study Mode Overlay
  if (viewingSet) {
    return (
      <div className="min-h-screen bg-white animate-in fade-in zoom-in-95 duration-300">
        <FlashcardViewer 
          set={viewingSet} 
          onBack={() => setViewingSet(null)} 
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 p-6 md:p-10">
      
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-2 border border-emerald-100/50 shadow-sm">
            <FaHistory className="mr-2" /> Recently Created
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
            Global <span className="text-emerald-500">Library.</span>
          </h1>
          <p className="text-gray-400 font-bold text-sm uppercase tracking-tight">
            Review all AI-generated sets from your documents.
          </p>
        </div>

        {/* Enhanced Search Input */}
        <div className="relative group w-full lg:w-96">
          <FaSearch
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-emerald-500 transition-colors"
            size={14}
          />
          <input
            type="text"
            placeholder="Search sets or documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all outline-none shadow-sm"
          />
        </div>
      </div>

      <div className="h-px bg-linear-to-r from-transparent via-gray-100 to-transparent" />

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold animate-bounce">
          <FaExclamationCircle /> {error}
        </div>
      )}

      {/* Content States */}
      {loading ? (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <FaSpinner className="animate-spin text-emerald-500 text-4xl" />
          <p className="text-gray-400 font-black tracking-widest uppercase text-[10px]">
            Syncing Global Records...
          </p>
        </div>
      ) : filteredSets.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-4xl border-2 border-dashed border-gray-100 flex flex-col items-center">
          <div className="bg-emerald-50 p-12 rounded-4xl mb-8 rotate-3 shadow-lg shadow-emerald-50/50">
            <FaBrain className="h-16 w-16 text-emerald-500 opacity-40" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 uppercase">Empty Library</h3>
          <p className="mt-3 text-gray-400 max-w-sm mx-auto font-bold text-[10px] tracking-widest uppercase italic">
            {searchTerm ? "No matches found." : "Upload a PDF to generate flashcards."}
          </p>
          {!searchTerm && (
            <Link
              to="/documents"
              className="mt-10 inline-flex items-center px-12 py-5 text-[10px] font-black rounded-2xl text-white bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-200 transition-all active:scale-95 uppercase tracking-widest"
            >
              <FaPlus className="mr-3" /> Go to Documents
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
          {filteredSets.map((set) => (
            <GlobalFlashcardCard
              key={set._id}
              set={set}
              onSelect={() => setViewingSet(set)}
              onDelete={handleOpenDelete} 
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Overlay */}
      <DeleteConfirmModal 
        isOpen={deleteModal.isOpen}
        docTitle={deleteModal.title}
        isDeleting={isDeleting}
        onClose={() => setDeleteModal({ isOpen: false, id: null, title: "" })}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default FlashcardList;