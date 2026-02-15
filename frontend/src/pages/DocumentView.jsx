
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import PDFViewer from "../components/features/PDFViewer";
import ChatInterface from "../components/features/ChatInterface";
import SummaryPanel from "../components/features/SummaryPanel";
import ExplainPanel from "../components/features/ExplainPanel";
import FlashcardSection from "../components/features/FlashcardSection";
import QuizList from "../components/features/QuizList";
import {
  FaComments,
  FaListAlt,
  FaBrain,
  FaArrowLeft,
  FaFilePdf,
  FaLayerGroup,
  FaQuestionCircle,
  FaRobot,
  FaBookOpen,
} from "react-icons/fa";
import clsx from "clsx";
import StudyMaterial from "../components/features/StudyMaterial";

const DocumentView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("content");

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await api.get(`/documents/${id}`);
        setDocument(response.data);
      } catch (error) {
        console.error("Error fetching document:", error);
        navigate("/documents");
      } finally {
        setLoading(false);
      }
    };
    fetchDocument();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] md:h-[80vh] space-y-4">
        <div className="h-10 w-10 md:h-12 md:w-12 border-4 border-emerald-100 border-t-emerald-600 animate-spin rounded-full"></div>
        <p className="text-gray-500 font-black tracking-widest uppercase text-[10px] md:text-xs animate-pulse">
          Initializing Workspace
        </p>
      </div>
    );
  }

  if (!document) return null;

  const fileUrl = document?.fileUrl || "";

  const tabs = [
    { id: "content", label: "PDF", icon: FaFilePdf },
    { id: "chat", label: "CHAT", icon: FaComments },
    { id: "actions", label: "AI", icon: FaBrain },
    { id: "flashcards", label: "CARDS", icon: FaLayerGroup },
    { id: "study material", label: "LIBRARY", icon: FaBookOpen },
    { id: "quizzes", label: "QUIZ", icon: FaQuestionCircle },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] md:h-[calc(100vh-100px)] bg-gray-50/50 rounded-2xl md:rounded-[3rem] p-1 md:p-2 animate-in fade-in zoom-in-95 duration-700">
      {/* 1. Header Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between px-2 md:px-1 mb-4 md:mb-2 gap-4 md:gap-3">
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button
            onClick={() => navigate("/documents")}
            className="group p-3 md:p-4 rounded-xl md:rounded-2xl bg-white shadow-sm border border-gray-100 text-gray-400 hover:text-emerald-600 transition-all active:scale-95"
          >
            <FaArrowLeft size={14} className="md:w-4 md:h-4" />
          </button>
          <div className="space-y-0.5 md:space-y-1 flex-1 min-w-0">
            <h1 className="text-sm md:text-lg font-black text-gray-900 tracking-tight leading-none truncate">
              {document.title}
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] md:tracking-[0.3em]">
                Workspace Active
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
          </div>
        </div>

        {/* Tab Switcher - Optimized for Mobile */}
        <div className="flex w-full lg:w-auto overflow-x-auto no-scrollbar bg-white/80 backdrop-blur-md p-1 rounded-2xl md:rounded-4xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-1 w-full justify-between lg:justify-start">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "flex items-center justify-center gap-2 px-3 md:px-4 py-2 md:py-1.5 rounded-xl md:rounded-3xl text-[9px] md:text-[11px] font-black transition-all duration-300 tracking-widest flex-1 lg:flex-none whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100"
                    : "text-gray-400 hover:text-emerald-600 hover:bg-emerald-50",
                )}
              >
                <tab.icon
                  size={12}
                  className={
                    activeTab === tab.id ? "text-white" : "text-gray-300"
                  }
                />
                <span className="inline-block">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Content Container */}
      <div className="flex-1 bg-white rounded-3xl md:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100/50 overflow-hidden relative">
        {/* Tab Rendering */}
        <div className="h-full w-full relative overflow-y-auto">
          {activeTab === "content" && (
            <div className="h-full p-1 md:p-2 animate-in fade-in duration-500">
              <PDFViewer fileUrl={fileUrl} />
            </div>
          )}

          {activeTab === "chat" && (
            <div className="h-full max-w-4xl mx-auto p-4 md:p-6 animate-in slide-in-from-bottom-4 duration-500">
              <ChatInterface documentId={id} />
            </div>
          )}

          {activeTab === "actions" && (
            <div className="h-full p-4 md:p-8 overflow-y-auto scrollbar-hide">
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 animate-in zoom-in-95 duration-500">
                <SummaryPanel documentId={id} />
                <ExplainPanel documentId={id} />
              </div>
            </div>
          )}

          {activeTab === "flashcards" && (
            <div className="h-full p-4 md:p-6 animate-in fade-in duration-500">
              <FlashcardSection documentId={id} />
            </div>
          )}

          {activeTab === "study material" && (
            <div className="h-full p-1 md:p-2 animate-in fade-in duration-500">
              <StudyMaterial/>
            </div>
          )}

          {activeTab === "quizzes" && (
            <div className="h-full p-4 md:p-6 animate-in fade-in duration-500">
              <QuizList documentId={id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentView;
