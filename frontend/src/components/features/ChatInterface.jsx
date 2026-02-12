
// import React, { useState, useRef, useEffect } from "react";
// import {
//   FaPaperPlane,
//   FaRobot,
//   FaUser,
//   FaSpinner,
//   FaCircle,
//   FaTrashAlt,
// } from "react-icons/fa";
// import api from "../../api/axios";
// import clsx from "clsx";

// const ChatInterface = ({ documentId }) => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const response = await api.get(`/ai/chat/${documentId}`);
//         if (response.data.length > 0) {
//           setMessages(response.data);
//         } else {
//           setMessages([
//             {
//               role: "model",
//               content: "Hello! I've analyzed this document. Ask me anything about it!",
//               _id: "init",
//             },
//           ]);
//         }
//       } catch (error) {
//         console.error("Failed to load history:", error);
//       } finally {
//         setInitialLoading(false);
//       }
//     };
//     fetchHistory();
//   }, [documentId]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleClearHistory = async () => {
//     if (!window.confirm("Clear this conversation?")) return;
//     try {
//       await api.delete(`/ai/chat/${documentId}`);
//       setMessages([{
//         role: "model",
//         content: "History cleared. What's next?",
//         _id: Date.now().toString(),
//       }]);
//     } catch (error) {
//       console.error("Clear history error:", error);
//     }
//   };

//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (!input.trim() || loading) return;

//     const userMessage = { role: "user", content: input, _id: Date.now().toString() };
//     setMessages((prev) => [...prev, userMessage]);
//     const currentInput = input;
//     setInput("");
//     setLoading(true);

//     try {
//       const response = await api.post("/ai/chat", {
//         documentId,
//         question: currentInput,
//       });

//       setMessages((prev) => [...prev, {
//         role: "model",
//         content: response.data.answer || "I couldn't process that.",
//         _id: (Date.now() + 1).toString(),
//       }]);
//     } catch (error) {
//       setMessages((prev) => [...prev, {
//         role: "model",
//         content: "Error connecting to AI. Try again.",
//         _id: (Date.now() + 1).toString(),
//         isError: true,
//       }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (initialLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-full gap-3">
//         <FaSpinner className="animate-spin text-emerald-500 text-xl" />
//         <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Loading...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col h-full w-full bg-white md:rounded-[2.5rem] overflow-hidden border-x border-b md:border border-gray-100 shadow-sm transition-all">
      
//       {/* 1. Header: Compact on Mobile */}
//       <div className="px-4 py-3 md:px-8 md:py-5 border-b border-gray-50 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-20">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-50 rounded-xl md:rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100/50">
//             <FaRobot size={18} className="md:hidden" />
//             <FaRobot size={22} className="hidden md:block" />
//           </div>
//           <div>
//             <h3 className="text-xs md:text-sm font-black text-gray-900 uppercase tracking-wider">AI Assistant</h3>
//             <div className="flex items-center gap-1.5">
//               <FaCircle className="text-emerald-500 animate-pulse" size={5} />
//               <span className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase">Context Active</span>
//             </div>
//           </div>
//         </div>

//         <button
//           onClick={handleClearHistory}
//           className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
//         >
//           <FaTrashAlt size={14} />
//         </button>
//       </div>

//       {/* 2. Chat Area: Full width on mobile */}
//       <div className="flex-1 overflow-y-auto px-4 py-6 md:p-8 space-y-6 md:space-y-8 scrollbar-hide bg-[#fafafa]/30">
//         {messages.map((msg) => (
//           <div
//             key={msg._id}
//             className={clsx(
//               "flex w-full items-start gap-3 md:gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500",
//               msg.role === "user" ? "flex-row-reverse" : "flex-row",
//             )}
//           >
//             {/* Avatars: Smaller on Mobile */}
//             <div className={clsx(
//                 "shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm",
//                 msg.role === "user" ? "bg-emerald-600 text-white" : "bg-white text-emerald-600 border border-gray-100",
//               )}
//             >
//               {msg.role === "user" ? <FaUser size={12} /> : <FaRobot size={16} />}
//             </div>

//             {/* Bubble: Max width 85% on mobile */}
//             <div className={clsx(
//                 "p-4 md:p-5 rounded-3xl md:rounded-4xl text-[13px] md:text-sm leading-relaxed shadow-sm max-w-[85%] md:max-w-[70%]",
//                 msg.role === "user"
//                   ? "bg-emerald-600 text-white rounded-tr-none"
//                   : "bg-white text-gray-700 rounded-tl-none border border-gray-100 font-semibold",
//                 msg.isError && "bg-red-50 text-red-700 border-red-100",
//               )}
//             >
//               {msg.content}
//             </div>
//           </div>
//         ))}

//         {loading && (
//           <div className="flex w-full items-start gap-3 animate-pulse">
//             <div className="shrink-0 w-8 h-8 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-emerald-600">
//               <FaRobot size={16} />
//             </div>
//             <div className="p-4 bg-white border border-gray-100 rounded-2xl rounded-tl-none">
//               <div className="flex space-x-1.5">
//                 <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
//                 <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
//                 <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
//               </div>
//             </div>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* 3. Input: Floating-style on mobile */}
//       <div className="p-4 md:p-8 bg-white border-t border-gray-50">
//         <form onSubmit={handleSend} className="relative group max-w-4xl mx-auto">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type your question..."
//             className="w-full pl-5 pr-14 py-3.5 md:pl-8 md:pr-20 md:py-5 bg-gray-50 border-2 border-transparent rounded-2xl md:rounded-4xl text-sm font-bold focus:bg-white focus:border-emerald-500/20 transition-all outline-none"
//             disabled={loading}
//           />
//           <button
//             type="submit"
//             disabled={!input.trim() || loading}
//             className="absolute right-1.5 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-emerald-600 text-white rounded-xl md:rounded-3xl hover:bg-emerald-700 disabled:opacity-30 transition-all shadow-lg shadow-emerald-200/50"
//           >
//             {loading ? <FaSpinner className="animate-spin text-sm" /> : <FaPaperPlane size={14} />}
//           </button>
//         </form>
//         <div className="mt-3 flex justify-center">
//           <span className="text-[8px] md:text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">
//             Powered by Gemini AI
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatInterface;




import React, { useState, useRef, useEffect } from "react";
import {
  FaPaperPlane,
  FaRobot,
  FaUser,
  FaSpinner,
  FaCircle,
  FaTrashAlt,
} from "react-icons/fa";
import api from "../../api/axios";
import clsx from "clsx";

const ChatInterface = ({ documentId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get(`/ai/chat/${documentId}`);
        if (response.data.length > 0) {
          setMessages(response.data);
        } else {
          setMessages([
            {
              role: "model",
              content: "Hello! I've analyzed this document. Ask me anything about it!",
              _id: "init",
            },
          ]);
        }
      } catch (error) {
        console.error("Failed to load history:", error);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchHistory();
  }, [documentId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleClearHistory = async () => {
    if (!window.confirm("Clear this conversation?")) return;
    try {
      await api.delete(`/ai/chat/${documentId}`);
      setMessages([{
        role: "model",
        content: "History cleared. What's next?",
        _id: Date.now().toString(),
      }]);
    } catch (error) {
      console.error("Clear history error:", error);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input, _id: Date.now().toString() };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      const response = await api.post("/ai/chat", {
        documentId,
        question: currentInput,
      });

      setMessages((prev) => [...prev, {
        role: "model",
        content: response.data.answer || "I couldn't process that.",
        _id: (Date.now() + 1).toString(),
      }]);
    } catch (error) {
      setMessages((prev) => [...prev, {
        role: "model",
        content: "Error connecting to AI. Try again.",
        _id: (Date.now() + 1).toString(),
        isError: true,
      }]);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 p-4">
        <FaSpinner className="animate-spin text-emerald-500 text-lg md:text-xl" />
        <span className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Loading Conversation...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm transition-all">
      
      {/* 1. Header: Balanced for Mobile/Desktop */}
      <div className="px-4 py-3 md:px-8 md:py-5 border-b border-gray-50 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-9 h-9 md:w-12 md:h-12 bg-emerald-50 rounded-xl md:rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100/50 shrink-0">
            <FaRobot size={18} className="md:size-6" />
          </div>
          <div className="min-w-0">
            <h3 className="text-[10px] md:text-sm font-black text-gray-900 uppercase tracking-wider truncate">AI Assistant</h3>
            <div className="flex items-center gap-1.5">
              <FaCircle className="text-emerald-500 animate-pulse" size={5} />
              <span className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-tight">Context Active</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleClearHistory}
          className="p-2 md:p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors active:scale-90"
          title="Clear History"
        >
          <FaTrashAlt size={12} className="md:size-3.5" />
        </button>
      </div>

      {/* 2. Chat Area: Responsive Bubble Widths */}
      <div className="flex-1 overflow-y-auto px-4 py-5 md:p-8 space-y-5 md:space-y-8 scrollbar-hide bg-[#fafafa]/30">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={clsx(
              "flex w-full items-start gap-2.5 md:gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500",
              msg.role === "user" ? "flex-row-reverse" : "flex-row",
            )}
          >
            {/* Avatars: Responsive Scaling */}
            <div className={clsx(
                "shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-2xl flex items-center justify-center shadow-sm",
                msg.role === "user" ? "bg-emerald-600 text-white" : "bg-white text-emerald-600 border border-gray-100",
              )}
            >
              {msg.role === "user" ? <FaUser size={10} className="md:size-3" /> : <FaRobot size={14} className="md:size-4" />}
            </div>

            {/* Bubble: Adapts to screen width */}
            <div className={clsx(
                "p-3.5 md:p-5 rounded-2xl md:rounded-4xl text-xs md:text-sm leading-relaxed shadow-sm max-w-[85%] md:max-w-[70%]",
                msg.role === "user"
                  ? "bg-emerald-600 text-white rounded-tr-none"
                  : "bg-white text-gray-700 rounded-tl-none border border-gray-100 font-semibold",
                msg.isError && "bg-red-50 text-red-700 border-red-100",
              )}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex w-full items-start gap-2.5 animate-pulse">
            <div className="shrink-0 w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-emerald-600">
              <FaRobot size={14} />
            </div>
            <div className="p-3.5 bg-white border border-gray-100 rounded-2xl rounded-tl-none">
              <div className="flex space-x-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 3. Input: Tighter spacing for mobile */}
      <div className="p-3 md:p-8 bg-white border-t border-gray-50">
        <form onSubmit={handleSend} className="relative group max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI..."
            className="w-full pl-4 pr-12 py-3 md:pl-8 md:pr-20 md:py-5 bg-gray-50 border-2 border-transparent rounded-xl md:rounded-4xl text-xs md:text-sm font-bold focus:bg-white focus:border-emerald-500/20 transition-all outline-none"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-1 top-1/2 -translate-y-1/2 p-2.5 md:p-4 bg-emerald-600 text-white rounded-lg md:rounded-3xl hover:bg-emerald-700 disabled:opacity-30 transition-all shadow-lg shadow-emerald-200/50 active:scale-95"
          >
            {loading ? <FaSpinner className="animate-spin text-xs" /> : <FaPaperPlane size={12} className="md:size-3.5" />}
          </button>
        </form>
        <div className="mt-2 flex justify-center">
          <span className="text-[7px] md:text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] text-center">
            AI can make mistakes. Verify important info.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;