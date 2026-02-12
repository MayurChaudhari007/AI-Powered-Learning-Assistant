

// import React, { useState, useEffect } from 'react';
// import { FaPlay, FaSpinner, FaListAlt, FaSyncAlt, FaStar, FaExternalLinkAlt, FaRobot } from 'react-icons/fa';
// import api from '../../api/axios';
// import SummaryModal from './SummaryModal'; // Import the modal

// const SummaryPanel = ({ documentId, docTitle }) => {
//     const [summary, setSummary] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     useEffect(() => {
//         const checkExistingSummary = async () => {
//             try {
//                 const response = await api.get(`/documents/${documentId}`);
//                 if (response.data.autoSummary) {
//                     setSummary(response.data.autoSummary);
//                 }
//             } catch (err) {
//                 console.error("Failed to fetch summary:", err);
//             }
//         };
//         checkExistingSummary();
//     }, [documentId]);

//     const handleAction = async () => {
//         setLoading(true);
//         try {
//             const response = await api.post('/ai/summary', { documentId });
//             setSummary(response.data.summary);
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="h-full flex flex-col bg-white md:rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
//             {/* Header */}
//             <div className="p-6 md:p-8 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                     <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-500 shadow-sm border border-emerald-100/50">
//                         <FaListAlt size={18} />
//                     </div>
//                     <div>
//                         <h3 className="text-xs md:text-sm font-black text-gray-900 uppercase tracking-wider">AI Summary</h3>
//                         <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Executive Overview</p>
//                     </div>
//                 </div>
//                 {summary && (
//                     <button onClick={handleAction} className="p-2 text-gray-300 hover:text-emerald-500 transition-colors">
//                         <FaSyncAlt size={12} className={loading ? "animate-spin" : ""} />
//                     </button>
//                 )}
//             </div>

//             {/* Content Area */}
//             <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#fafafa]/30">
//                 {loading ? (
//                     <div className="flex flex-col items-center gap-4">
//                         <div className="relative">
//                             <div className="h-16 w-16 rounded-full border-4 border-emerald-100 border-t-emerald-500 animate-spin"></div>
//                             <FaRobot className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500 text-xl" />
//                         </div>
//                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest animate-pulse">Scanning Document...</p>
//                     </div>
//                 ) : summary ? (
//                     <div className="space-y-6 animate-in zoom-in-95 duration-500">
//                         <div className="p-6 bg-emerald-50 rounded-4xl inline-block border border-emerald-100/50 shadow-inner">
//                             <FaListAlt className="text-4xl text-emerald-400" />
//                         </div>
//                         <div className="space-y-2">
//                             <h4 className="text-lg font-black text-gray-900">Summary Ready!</h4>
//                             <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">15-20 Key Points Extracted</p>
//                         </div>
//                         <button 
//                             onClick={() => setIsModalOpen(true)}
//                             className="flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white text-xs font-black uppercase rounded-2xl shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95"
//                         >
//                             <FaExternalLinkAlt size={10} /> View Full Summary
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="space-y-6">
//                         <div className="p-8 bg-emerald-50 rounded-[2.5rem] -rotate-3 border border-emerald-100/50">
//                             <FaStar className="text-4xl text-emerald-300 animate-pulse" />
//                         </div>
//                         <div className="space-y-2">
//                             <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight">Need a Recap?</h4>
//                             <p className="text-[10px] text-gray-400 font-bold max-w-50 mx-auto uppercase">Condense deep theory into 20 clear points</p>
//                         </div>
//                         <button 
//                             onClick={handleAction}
//                             className="px-8 py-4 bg-emerald-600 text-white text-xs font-black uppercase rounded-2xl shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all"
//                         >
//                             Summarize Now
//                         </button>
//                     </div>
//                 )}
//             </div>

//             {/* Hidden Modal */}
//             <SummaryModal 
//                 isOpen={isModalOpen} 
//                 onClose={() => setIsModalOpen(false)} 
//                 summary={summary} 
//                 docTitle={docTitle} 
//             />
//         </div>
//     );
// };

// export default SummaryPanel;




import React, { useState, useEffect } from 'react';
import { FaPlay, FaSpinner, FaListAlt, FaSyncAlt, FaStar, FaExternalLinkAlt, FaRobot } from 'react-icons/fa';
import api from '../../api/axios';
import SummaryModal from './SummaryModal'; 

const SummaryPanel = ({ documentId, docTitle }) => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const checkExistingSummary = async () => {
            try {
                const response = await api.get(`/documents/${documentId}`);
                if (response.data.autoSummary) {
                    setSummary(response.data.autoSummary);
                }
            } catch (err) {
                console.error("Failed to fetch summary:", err);
            }
        };
        checkExistingSummary();
    }, [documentId]);

    const handleAction = async () => {
        setLoading(true);
        try {
            const response = await api.post('/ai/summary', { documentId });
            setSummary(response.data.summary);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-white rounded-3xl md:rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            {/* Header - Responsive Padding */}
            <div className="p-5 md:p-8 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                    <div className="p-2 md:p-2.5 bg-emerald-50 rounded-xl text-emerald-500 shadow-sm border border-emerald-100/50">
                        <FaListAlt size={16} className="md:size-4.5" />
                    </div>
                    <div>
                        <h3 className="text-[10px] md:text-sm font-black text-gray-900 uppercase tracking-wider leading-none">AI Summary</h3>
                        <p className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase mt-1">Executive Overview</p>
                    </div>
                </div>
                {summary && (
                    <button onClick={handleAction} className="p-2 text-gray-300 hover:text-emerald-500 transition-colors active:scale-90">
                        <FaSyncAlt size={10} className={loading ? "animate-spin" : "md:size-3"} />
                    </button>
                )}
            </div>

            {/* Content Area - Adaptive Layout */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-8 text-center bg-[#fafafa]/30">
                {loading ? (
                    <div className="flex flex-col items-center gap-3 md:gap-4">
                        <div className="relative">
                            <div className="h-12 w-12 md:h-16 md:w-16 rounded-full border-4 border-emerald-100 border-t-emerald-500 animate-spin"></div>
                            <FaRobot className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500 text-lg md:text-xl" />
                        </div>
                        <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest animate-pulse">Scanning Document...</p>
                    </div>
                ) : summary ? (
                    <div className="space-y-4 md:space-y-6 animate-in zoom-in-95 duration-500">
                        <div className="p-4 md:p-6 bg-emerald-50 rounded-4xl md:rounded-4xl inline-block border border-emerald-100/50 shadow-inner">
                            <FaListAlt className="text-2xl md:text-4xl text-emerald-400" />
                        </div>
                        <div className="space-y-1 md:space-y-2">
                            <h4 className="text-base md:text-lg font-black text-gray-900 uppercase tracking-tight">Summary Ready!</h4>
                            <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wide">Key Points Extracted</p>
                        </div>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-emerald-600 text-white text-[10px] md:text-xs font-black uppercase rounded-xl md:rounded-2xl shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95"
                        >
                            <FaExternalLinkAlt size={10} /> View Summary
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4 md:space-y-6">
                        <div className="p-6 md:p-8 bg-emerald-50 rounded-2xl md:rounded-[2.5rem] -rotate-3 border border-emerald-100/50">
                            <FaStar className="text-2xl md:text-4xl text-emerald-300 animate-pulse" />
                        </div>
                        <div className="space-y-1 md:space-y-2">
                            <h4 className="text-base md:text-lg font-black text-gray-900 uppercase tracking-tight leading-none">Need a Recap?</h4>
                            <p className="text-[9px] md:text-[10px] text-gray-400 font-bold max-w-45 mx-auto uppercase">Condense deep theory into clear points</p>
                        </div>
                        <button 
                            onClick={handleAction}
                            className="px-6 md:px-8 py-3 md:py-4 bg-emerald-600 text-white text-[10px] md:text-xs font-black uppercase rounded-xl md:rounded-2xl shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95"
                        >
                            Summarize Now
                        </button>
                    </div>
                )}
            </div>

            {/* Modal remains separate */}
            <SummaryModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                summary={summary} 
                docTitle={docTitle} 
            />
        </div>
    );
};

export default SummaryPanel;