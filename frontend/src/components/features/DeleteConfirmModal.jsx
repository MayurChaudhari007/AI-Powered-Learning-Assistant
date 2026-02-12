

import React from 'react';
import { FaExclamationTriangle, FaTrashAlt } from 'react-icons/fa';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, docTitle }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop with enhanced blur for mobile focus */}
            <div 
                className="absolute inset-0 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal - Responsive Width and Max Height */}
            <div className="relative w-full max-w-sm md:max-w-md bg-white rounded-3xl md:rounded-4xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="p-6 md:p-8 text-center">
                    {/* Icon scaling for mobile */}
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-red-50 rounded-xl md:rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-4 md:mb-6 border border-red-100">
                        <FaExclamationTriangle className="text-xl md:text-2xl" />
                    </div>
                    
                    <h3 className="text-lg md:text-xl font-black text-gray-900 mb-2 uppercase tracking-tight leading-none">
                        Confirm Delete
                    </h3>
                    <p className="text-[11px] md:text-sm text-gray-400 font-bold mb-6 md:mb-8 leading-relaxed">
                        Are you sure you want to delete <span className="text-gray-900 font-black">"{docTitle}"</span>? <br className="hidden md:block" /> This action cannot be undone.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3.5 md:py-4 bg-gray-50 text-gray-500 text-[10px] md:text-xs font-black uppercase rounded-xl md:rounded-2xl hover:bg-gray-100 transition-all active:scale-95"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 py-3.5 md:py-4 bg-red-500 text-white text-[10px] md:text-xs font-black uppercase rounded-xl md:rounded-2xl shadow-lg shadow-red-200 hover:bg-red-600 transition-all flex items-center justify-center gap-2 active:scale-95"
                        >
                            <FaTrashAlt size={10} /> Delete Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;