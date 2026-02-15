import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaYoutube,
  FaExternalLinkAlt,
  FaLightbulb,
  FaBookReader,
  FaRegSadTear,
} from "react-icons/fa";
import api from "../../api/axios";

const StudyMaterial = () => {
  const { id } = useParams();
  const [resources, setResources] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        setError(false);
        const { data } = await api.get(`/documents/${id}/resources`);
        setResources(data);
      } catch (err) {
        console.error("Failed to load study materials", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchResources();
  }, [id]);

  // --- 1. Loading Skeleton State ---
  if (loading) {
    return (
      <div className="p-5 lg:p-10 space-y-10 animate-pulse">
        <div className="h-8 w-64 bg-gray-200 rounded-lg mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="aspect-video bg-gray-100 rounded-3xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-50 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  // --- 2. Error or Not Found State ---
  if (error || !resources || !resources.isAnalyzed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-10 text-center">
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-4">
          <FaRegSadTear className="text-rose-500 text-3xl" />
        </div>
        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">
          No Resources Found
        </h3>
        <p className="text-gray-500 max-w-xs mt-2 text-sm font-medium">
          Our AI couldn't curate a roadmap for this specific document. Try
          refreshing or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-10 space-y-12 animate-in fade-in zoom-in-95 duration-700 pb-20">
      {/* --- HEADER: Topic Highlight --- */}
      <div className="bg-emerald-600 rounded-4xl p-6 lg:p-10 text-white shadow-2xl shadow-emerald-200 relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">
            Learning Roadmap
          </span>
          <h2 className="text-2xl lg:text-4xl font-black mt-2 capitalize">
            {resources.topic}
          </h2>
        </div>
        <FaBookReader className="absolute -right-4 -bottom-4 text-emerald-500/30 text-9xl rotate-12" />
      </div>

      {/* --- SECTION: YouTube Tutorials --- */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-sm lg:text-lg font-black uppercase tracking-widest text-gray-900 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
              <FaYoutube className="text-rose-600" />
            </span>
            Video Guides
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resources.videos.map((video, index) => (
            <a
              key={index}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-video rounded-4xl overflow-hidden shadow-xl mb-4 border-4 border-white">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800";
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div
                  className={`absolute top-4 right-4 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg ${video.language === "Hindi" ? "bg-emerald-500" : "bg-blue-600"}`}
                >
                  {video.language}
                </div>
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <button className="bg-white text-black px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl">
                    Watch Now
                  </button>
                </div>
              </div>
              <p className="text-md lg:text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors leading-tight px-2">
                {video.title}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* --- SECTION: External Links & Key Concepts --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Links Area */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 flex items-center gap-2 px-2">
            <FaExternalLinkAlt size={12} /> Authority Resources
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {resources.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-3xl border border-gray-100 bg-white hover:bg-emerald-50/30 hover:border-emerald-200 hover:shadow-2xl transition-all duration-300 flex items-center justify-between group"
              >
                <div className="min-w-0">
                  <span className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em]">
                    {link.category}
                  </span>
                  <p className="font-bold text-gray-900 mt-1 truncate pr-2">
                    {link.name}
                  </p>
                </div>
                <div className="shrink-0 w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-white group-hover:text-emerald-500 transition-colors shadow-inner">
                  <FaExternalLinkAlt size={14} />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* AI Key Concepts Area */}
        <div className="bg-gray-50 rounded-[2.5rem] p-8 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 flex items-center gap-2">
            <FaLightbulb className="text-amber-500" /> Must Master
          </h3>
          <ul className="space-y-3">
            {resources.keyConcepts.map((concept, index) => (
              <li
                key={index}
                className="flex items-center gap-3 p-3 bg-white rounded-2xl shadow-sm border border-gray-100 group hover:scale-105 transition-transform"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-xs font-bold text-gray-700">
                  {concept}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterial;
