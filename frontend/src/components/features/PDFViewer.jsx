
// import React, { useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
// import { 
//     FaChevronLeft, 
//     FaChevronRight, 
//     FaSearchMinus, 
//     FaSearchPlus, 
//     FaExternalLinkAlt,
//     FaSpinner,
//     FaFilePdf
// } from 'react-icons/fa';
// import 'react-pdf/dist/Page/AnnotationLayer.css';
// import 'react-pdf/dist/Page/TextLayer.css';

// // Using a stable CDN for the PDF worker to ensure responsiveness
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// const PDFViewer = ({ fileUrl }) => {
//     const [numPages, setNumPages] = useState(null);
//     const [pageNumber, setPageNumber] = useState(1);
//     const [scale, setScale] = useState(1.1);
//     const [isLoading, setIsLoading] = useState(true);

//     const onDocumentLoadSuccess = ({ numPages }) => {
//         setNumPages(numPages);
//         setIsLoading(false);
//     };

//     const handleOpenNewTab = () => {
//         if (fileUrl) {
//             window.open(fileUrl, '_blank', 'noopener,noreferrer');
//         }
//     };

//     return (
//         <div className="flex flex-col h-full bg-[#F1F5F9] overflow-hidden">
//             {/* 1. Header Toolbar - Integrated & Responsive */}
//             <div className="flex flex-wrap items-center justify-between px-6 py-3 bg-white border-b border-gray-100 shadow-sm z-10">
//                 <div className="flex items-center gap-4">
//                     <div className="hidden sm:flex items-center px-3 py-1 bg-gray-50 rounded-lg border border-gray-100">
//                         <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Document Viewer</span>
//                     </div>
//                     <button 
//                         onClick={handleOpenNewTab}
//                         className="flex items-center gap-2 px-3 py-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all text-xs font-bold"
//                     >
//                         <FaExternalLinkAlt size={12} />
//                         <span className="hidden md:inline">Open in new tab</span>
//                     </button>
//                 </div>

//                 {/* Center Controls: Navigation */}
//                 <div className="flex items-center gap-4 bg-gray-50 px-4 py-1.5 rounded-2xl border border-gray-100">
//                     <button
//                         disabled={pageNumber <= 1}
//                         onClick={() => setPageNumber(p => p - 1)}
//                         className="p-1.5 text-gray-400 hover:text-emerald-600 disabled:opacity-20 transition-all"
//                     >
//                         <FaChevronLeft size={12} />
//                     </button>
                    
//                     <div className="flex items-center gap-1 font-black text-xs">
//                         <span className="text-gray-900">{pageNumber}</span>
//                         <span className="text-gray-300">/</span>
//                         <span className="text-gray-400">{numPages || '--'}</span>
//                     </div>

//                     <button
//                         disabled={pageNumber >= numPages}
//                         onClick={() => setPageNumber(p => p + 1)}
//                         className="p-1.5 text-gray-400 hover:text-emerald-600 disabled:opacity-20 transition-all"
//                     >
//                         <FaChevronRight size={12} />
//                     </button>
//                 </div>

//                 {/* Zoom Controls */}
//                 <div className="hidden sm:flex items-center gap-2">
//                     <button
//                         onClick={() => setScale(s => Math.max(0.5, s - 0.2))}
//                         className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
//                     >
//                         <FaSearchMinus size={14} />
//                     </button>
//                     <span className="text-[11px] font-black text-gray-700 w-10 text-center">{Math.round(scale * 100)}%</span>
//                     <button
//                         onClick={() => setScale(s => Math.min(2.5, s + 0.2))}
//                         className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
//                     >
//                         <FaSearchPlus size={14} />
//                     </button>
//                 </div>
//             </div>

//             {/* 2. Main Content Area */}
//             <div className="flex-1 overflow-auto flex justify-center p-6 md:p-10 scrollbar-thin scrollbar-thumb-gray-200">
//                 {!fileUrl ? (
//                     <div className="flex flex-col items-center justify-center text-gray-400 space-y-4">
//                         <FaFilePdf size={60} className="opacity-10" />
//                         <p className="text-xs font-black uppercase tracking-widest opacity-40">No Resource Linked</p>
//                     </div>
//                 ) : (
//                     <Document
//                         file={fileUrl}
//                         onLoadSuccess={onDocumentLoadSuccess}
//                         loading={
//                             <div className="flex flex-col items-center justify-center h-125 w-full max-w-2xl bg-white rounded-3xl shadow-sm border border-gray-100 animate-pulse">
//                                 <FaSpinner className="animate-spin text-emerald-200 text-4xl mb-4" />
//                                 <div className="h-2 w-32 bg-gray-100 rounded-full"></div>
//                             </div>
//                         }
//                         error={
//                             <div className="p-10 text-red-400 text-xs font-bold bg-red-50 rounded-3xl border border-red-100 flex items-center gap-3">
//                                 <div className="w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
//                                 Error loading document stream. Try refreshing.
//                             </div>
//                         }
//                         className="flex flex-col items-center"
//                     >
//                         <Page
//                             pageNumber={pageNumber}
//                             scale={scale}
//                             renderTextLayer={true}
//                             renderAnnotationLayer={true}
//                             className="shadow-[0_10px_30px_rgba(0,0,0,0.05)] rounded-lg overflow-hidden border border-gray-200"
//                             loading={null}
//                         />
//                     </Document>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default PDFViewer;




import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { 
    FaChevronLeft, 
    FaChevronRight, 
    FaSearchMinus, 
    FaSearchPlus, 
    FaExternalLinkAlt,
    FaSpinner,
    FaFilePdf
} from 'react-icons/fa';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Using a stable CDN for the PDF worker to ensure responsiveness
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewer = ({ fileUrl }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.1);
    const [isLoading, setIsLoading] = useState(true);

    // Responsive Scale Adjustment
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setScale(0.6); // Shrink for mobile phones
            } else if (window.innerWidth < 1024) {
                setScale(0.85); // Moderate for tablets
            } else {
                setScale(1.1); // Default for desktop
            }
        };

        handleResize(); // Run on mount
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setIsLoading(false);
    };

    const handleOpenNewTab = () => {
        if (fileUrl) {
            window.open(fileUrl, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#F1F5F9] overflow-hidden rounded-2xl md:rounded-[2.5rem]">
            {/* 1. Header Toolbar - Responsive Flex Layout */}
            <div className="flex flex-wrap items-center justify-between px-3 md:px-6 py-2 md:py-3 bg-white border-b border-gray-100 shadow-sm z-10 gap-2">
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="hidden lg:flex items-center px-3 py-1 bg-gray-50 rounded-lg border border-gray-100">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Document Viewer</span>
                    </div>
                    <button 
                        onClick={handleOpenNewTab}
                        className="flex items-center gap-2 px-2 md:px-3 py-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all text-[10px] md:text-xs font-black uppercase tracking-wider"
                    >
                        <FaExternalLinkAlt size={10} />
                        <span className="hidden sm:inline">Open</span>
                    </button>
                </div>

                {/* Center Controls: Navigation */}
                <div className="flex items-center gap-2 md:gap-4 bg-gray-50 px-3 md:px-4 py-1 rounded-xl md:rounded-2xl border border-gray-100">
                    <button
                        disabled={pageNumber <= 1}
                        onClick={() => setPageNumber(p => p - 1)}
                        className="p-1 md:p-1.5 text-gray-400 hover:text-emerald-600 disabled:opacity-20 transition-all"
                    >
                        <FaChevronLeft size={10} />
                    </button>
                    
                    <div className="flex items-center gap-1 font-black text-[10px] md:text-xs">
                        <span className="text-gray-900">{pageNumber}</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-400">{numPages || '--'}</span>
                    </div>

                    <button
                        disabled={pageNumber >= numPages}
                        onClick={() => setPageNumber(p => p + 1)}
                        className="p-1 md:p-1.5 text-gray-400 hover:text-emerald-600 disabled:opacity-20 transition-all"
                    >
                        <FaChevronRight size={10} />
                    </button>
                </div>

                {/* Zoom Controls - Scaled for Touch */}
                <div className="flex items-center gap-1 md:gap-2">
                    <button
                        onClick={() => setScale(s => Math.max(0.4, s - 0.1))}
                        className="p-1.5 md:p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                    >
                        <FaSearchMinus size={12} />
                    </button>
                    <span className="text-[9px] md:text-[11px] font-black text-gray-700 w-8 md:w-10 text-center">{Math.round(scale * 100)}%</span>
                    <button
                        onClick={() => setScale(s => Math.min(2.0, s + 0.1))}
                        className="p-1.5 md:p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                    >
                        <FaSearchPlus size={12} />
                    </button>
                </div>
            </div>

            {/* 2. Main Content Area - Optimized Padding */}
            <div className="flex-1 overflow-auto flex justify-center p-4 md:p-10 scrollbar-thin scrollbar-thumb-gray-200">
                {!fileUrl ? (
                    <div className="flex flex-col items-center justify-center text-gray-400 space-y-4">
                        <FaFilePdf size={40} className="opacity-10 md:size-60" />
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">No Resource Linked</p>
                    </div>
                ) : (
                    <Document
                        file={fileUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={
                            <div className="flex flex-col items-center justify-center h-64 md:h-125 w-full max-w-2xl bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 animate-pulse px-4">
                                <FaSpinner className="animate-spin text-emerald-200 text-3xl md:text-4xl mb-4" />
                                <div className="h-1.5 w-24 md:w-32 bg-gray-100 rounded-full"></div>
                            </div>
                        }
                        error={
                            <div className="p-6 md:p-10 text-red-400 text-[10px] md:text-xs font-bold bg-red-50 rounded-2xl md:rounded-3xl border border-red-100 flex items-center gap-3">
                                <div className="w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
                                Error loading stream.
                            </div>
                        }
                        className="flex flex-col items-center"
                    >
                        <Page
                            pageNumber={pageNumber}
                            scale={scale}
                            renderTextLayer={true}
                            renderAnnotationLayer={true}
                            className="shadow-xl rounded-lg overflow-hidden border border-gray-200"
                            loading={null}
                        />
                    </Document>
                )}
            </div>
        </div>
    );
};

export default PDFViewer;