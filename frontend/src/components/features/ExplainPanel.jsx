
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