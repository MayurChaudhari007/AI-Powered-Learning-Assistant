
// // -----------------------------------------------------------------------------------------------


// import React, { useEffect, useState, useRef } from 'react';
// import api from '../api/axios';
// import { 
//     FaPlus, 
//     FaSpinner, 
//     FaCloudUploadAlt, 
//     FaFilePdf, 
//     FaSearch, 
//     FaBookOpen, 
//     FaInfoCircle 
// } from 'react-icons/fa';
// import DocumentCard from '../components/features/DocumentCard';

// const DocumentList = () => {
//     const [documents, setDocuments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [uploading, setUploading] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");
//     const fileInputRef = useRef(null);

//     const fetchDocuments = async () => {
//         try {
//             const response = await api.get('/documents');
//             setDocuments(response.data);
//         } catch (error) {
//             console.error("Error fetching documents:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchDocuments();
//     }, []);

//     const handleFileChange = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         if (file.type !== 'application/pdf') {
//             alert('Please upload a PDF file.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('title', file.name.replace('.pdf', ''));

//         setUploading(true);
//         try {
//             await api.post('/documents/upload', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             await fetchDocuments();
//         } catch (error) {
//             console.error("Error uploading document:", error);
//             alert('Upload failed. Check your connection or file size.');
//         } finally {
//             setUploading(false);
//             if (fileInputRef.current) fileInputRef.current.value = '';
//         }
//     };

//     const handleDelete = async (id) => {
//         if (!window.confirm("This will permanently remove this document and its AI data. Proceed?")) return;
//         try {
//             await api.delete(`/documents/${id}`);
//             setDocuments(documents.filter(d => d._id !== id));
//         } catch (error) {
//             console.error("Failed to delete document", error);
//         }
//     };

//     const filteredDocuments = documents.filter(doc => 
//         doc.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//         <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
//             {/* Page Header */}
//             <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
//                 <div className="space-y-2">
//                     <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">
//                         <FaBookOpen className="mr-2" /> Digital Library
//                     </div>
//                     <h1 className="text-4xl font-black text-gray-900 tracking-tight">My Documents</h1>
//                     <p className="text-gray-500 font-medium">Manage and organize your learning materials for AI analysis.</p>
//                 </div>

//                 <div className="flex flex-wrap items-center gap-4">
//                     {/* Search Bar */}
//                     <div className="relative flex-1 min-w-70">
//                         <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                         <input 
//                             type="text" 
//                             placeholder="Search your library..."
//                             className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium"
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                         />
//                     </div>

//                     <input
//                         type="file"
//                         ref={fileInputRef}
//                         onChange={handleFileChange}
//                         accept="application/pdf"
//                         className="hidden"
//                     />
//                     <button
//                         onClick={() => fileInputRef.current.click()}
//                         disabled={uploading}
//                         className="inline-flex items-center px-8 py-3.5 border border-transparent text-sm font-black rounded-2xl shadow-lg shadow-emerald-100 text-white bg-emerald-600 hover:bg-emerald-700 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none transition-all disabled:opacity-70"
//                     >
//                         {uploading ? (
//                             <>
//                                 <FaSpinner className="animate-spin mr-2 h-4 w-4" />
//                                 Processing with AI...
//                             </>
//                         ) : (
//                             <>
//                                 <FaPlus className="mr-2 h-4 w-4" />
//                                 Upload Document
//                             </>
//                         )}
//                     </button>
//                 </div>
//             </div>

//             <hr className="border-gray-100" />

//             {/* Content Area */}
//             {loading ? (
//                 <div className="flex flex-col justify-center items-center h-96 space-y-4">
//                     <div className="relative">
//                         <div className="h-16 w-16 rounded-full border-4 border-emerald-50 border-t-emerald-500 animate-spin"></div>
//                         <FaFilePdf className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500 text-xl" />
//                     </div>
//                     <p className="text-gray-400 font-bold tracking-widest uppercase text-xs">Syncing Library</p>
//                 </div>
//             ) : filteredDocuments.length === 0 ? (
//                 <div className="text-center py-24 bg-white rounded-4xl border-2 border-dashed border-gray-100 flex flex-col items-center">
//                     <div className="bg-emerald-50 p-8 rounded-3xl mb-6 rotate-3">
//                         <FaCloudUploadAlt className="h-16 w-16 text-emerald-500" />
//                     </div>
//                     <h3 className="text-2xl font-black text-gray-900">Your library is empty</h3>
//                     <p className="mt-3 text-gray-500 max-w-sm mx-auto font-medium">
//                         Upload your study materials (PDF) to unlock AI-powered summaries, smart flashcards, and interactive quizzes.
//                     </p>
//                     <div className="mt-8 flex items-center gap-3 text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-xl border border-amber-100">
//                         <FaInfoCircle />
//                         <span>Max file size: 10MB (PDF only)</span>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//                     {filteredDocuments.map((doc) => (
//                         <DocumentCard key={doc._id} doc={doc} onDelete={handleDelete} />
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default DocumentList;




import React, { useEffect, useState, useRef } from 'react';
import api from '../api/axios';
import { 
    FaPlus, 
    FaSpinner, 
    FaCloudUploadAlt, 
    FaFilePdf, 
    FaSearch, 
    FaBookOpen, 
    FaInfoCircle 
} from 'react-icons/fa';
import DocumentCard from '../components/features/DocumentCard';

const DocumentList = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const fileInputRef = useRef(null);

    const fetchDocuments = async () => {
        try {
            const response = await api.get('/documents');
            setDocuments(response.data);
        } catch (error) {
            console.error("Error fetching documents:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            alert('Please upload a PDF file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', file.name.replace('.pdf', ''));

        setUploading(true);
        try {
            await api.post('/documents/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            await fetchDocuments();
        } catch (error) {
            console.error("Error uploading document:", error);
            alert('Upload failed. Check your connection or file size.');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("This will permanently remove this document and its AI data. Proceed?")) return;
        try {
            await api.delete(`/documents/${id}`);
            setDocuments(documents.filter(d => d._id !== id));
        } catch (error) {
            console.error("Failed to delete document", error);
        }
    };

    const filteredDocuments = documents.filter(doc => 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-0 space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="space-y-1 md:space-y-2">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1 md:mb-2">
                        <FaBookOpen className="mr-2" /> Digital Library
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">My Documents</h1>
                    <p className="text-xs md:text-sm text-gray-500 font-medium">Manage and organize your learning materials.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
                    {/* Search Bar */}
                    <div className="relative flex-1 sm:min-w-75">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                        <input 
                            type="text" 
                            placeholder="Search library..."
                            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-xl md:rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="application/pdf"
                        className="hidden"
                    />
                    <button
                        onClick={() => fileInputRef.current.click()}
                        disabled={uploading}
                        className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-3.5 border border-transparent text-[11px] md:text-sm font-black rounded-xl md:rounded-2xl shadow-lg shadow-emerald-100 text-white bg-emerald-600 hover:bg-emerald-700 transition-all disabled:opacity-70 active:scale-95"
                    >
                        {uploading ? (
                            <>
                                <FaSpinner className="animate-spin mr-2 h-3 w-3 md:h-4 md:w-4" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <FaPlus className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                                Upload PDF
                            </>
                        )}
                    </button>
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* Content Area */}
            {loading ? (
                <div className="flex flex-col justify-center items-center h-64 md:h-96 space-y-4">
                    <div className="relative">
                        <div className="h-12 w-12 md:h-16 md:w-16 rounded-full border-4 border-emerald-50 border-t-emerald-500 animate-spin"></div>
                        <FaFilePdf className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500 text-lg md:text-xl" />
                    </div>
                    <p className="text-gray-400 font-bold tracking-widest uppercase text-[10px]">Syncing Library</p>
                </div>
            ) : filteredDocuments.length === 0 ? (
                <div className="text-center py-16 md:py-24 bg-white rounded-3xl md:rounded-4xl border-2 border-dashed border-gray-100 flex flex-col items-center px-6">
                    <div className="bg-emerald-50 p-6 md:p-8 rounded-2xl md:rounded-3xl mb-4 md:mb-6 rotate-3">
                        <FaCloudUploadAlt className="h-12 w-12 md:h-16 md:w-16 text-emerald-500" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-gray-900">Your library is empty</h3>
                    <p className="mt-2 md:mt-3 text-[11px] md:text-sm text-gray-500 max-w-xs md:max-w-sm mx-auto font-medium">
                        Upload study materials (PDF) to unlock AI-powered summaries and quizzes.
                    </p>
                    <div className="mt-6 md:mt-8 flex items-center gap-2 md:gap-3 text-[10px] md:text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-lg md:rounded-xl border border-amber-100">
                        <FaInfoCircle />
                        <span>Max file size: 10MB</span>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                    {filteredDocuments.map((doc) => (
                        <DocumentCard key={doc._id} doc={doc} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DocumentList;