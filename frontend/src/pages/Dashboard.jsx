
// import React, { useEffect, useState } from "react";
// import {
//   FaFileAlt,
//   FaLayerGroup,
//   FaQuestionCircle,
//   FaPlus,
//   FaClock,
//   FaSpinner,
// } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { useAuth } from "../context/AuthContext";

// const StatCard = ({ title, count, icon: Icon, iconColor, bgColor, to }) => (
//   <Link
//     to={to}
//     className="group bg-white p-8 rounded-4xl shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
//   >
//     <div className="flex items-center justify-between">
//       <div>
//         <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{title}</p>
//         <h3 className="text-4xl font-black text-gray-900 mt-2 tracking-tighter">{count}</h3>
//       </div>
//       <div className={`p-5 rounded-3xl ${bgColor} transition-all duration-500 group-hover:scale-110 shadow-sm`}>
//         <Icon className={`h-8 w-8 ${iconColor}`} />
//       </div>
//     </div>
//   </Link>
// );

// const Dashboard = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [data, setData] = useState({
//     stats: { totalDocs: 0, totalFlashcards: 0, totalQuizzes: 0 },
//     recentActivity: []
//   });
//   const [loading, setLoading] = useState(true);

//   const cardStyles = {
//     documents: { color: "text-blue-500", bg: "bg-blue-50" },
//     flashcards: { color: "text-pink-500", bg: "bg-pink-50" },
//     quizzes: { color: "text-emerald-500", bg: "bg-emerald-50" },
//   };

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         // One single call to get everything
//         const response = await api.get("/dashboard/stats");
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching dashboard data", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDashboardData();
//   }, []);

//   const getRelativeTime = (date) => {
//     const diff = Math.floor((new Date() - new Date(date)) / 1000);
//     if (diff < 60) return 'Just now';
//     if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
//     if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
//     return new Date(date).toLocaleDateString();
//   };

//   if (loading) {
//     return (
//       <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
//         <FaSpinner className="text-emerald-500 animate-spin text-4xl" />
//         <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Syncing your progress...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in zoom-in-95 duration-700">
      
//       {/* Welcome Header */}
//       <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
//         <div className="space-y-2">
//           <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">
//             Welcome back, <span className="text-emerald-500">{user?.name}</span>
//           </h1>
//           <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
//             Ready to master something new today?
//           </p>
//         </div>
//         <Link
//           to="/documents"
//           className="bg-gray-900 text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all hover:shadow-xl hover:shadow-emerald-100 flex items-center justify-center gap-3 active:scale-95"
//         >
//           <FaPlus /> Upload Document
//         </Link>
//       </div>

//       {/* Real-time Stats Grid */}
//       <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
//         <StatCard
//           title="Documents"
//           count={data.stats.totalDocs}
//           icon={FaFileAlt}
//           iconColor={cardStyles.documents.color}
//           bgColor={cardStyles.documents.bg}
//           to="/documents"
//         />
//         <StatCard
//           title="Flashcards"
//           count={data.stats.totalFlashcards}
//           icon={FaLayerGroup}
//           iconColor={cardStyles.flashcards.color}
//           bgColor={cardStyles.flashcards.bg}
//           to="/flashcards"
//         />
//         <StatCard
//           title="Quizzes"
//           count={data.stats.totalQuizzes}
//           icon={FaQuestionCircle}
//           iconColor={cardStyles.quizzes.color}
//           bgColor={cardStyles.quizzes.bg}
//           to="/quizzes"
//         />
//       </div>

//       {/* Dynamic Recent Activity Section */}
//       <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
//         <div className="px-10 py-8 border-b border-gray-50 flex items-center gap-3">
//           <div className="p-3 bg-emerald-50 text-emerald-500 rounded-2xl">
//             <FaClock />
//           </div>
//           <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em]">Live Activity Feed</h3>
//         </div>
        
//         <div className="divide-y divide-gray-50">
//           {data.recentActivity.length > 0 ? (
//             data.recentActivity.map((activity) => (
//               <div
//                 key={activity._id}
//                 className="px-10 py-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors group"
//               >
//                 <div className="flex items-center gap-6">
//                   <div className={`w-3 h-3 rounded-full shadow-sm animate-pulse ${
//                     activity.type === "quiz" ? "bg-emerald-500" : 
//                     activity.type === "flashcard" ? "bg-pink-500" : "bg-blue-500"
//                   }`} />
//                   <div>
//                     <p className="text-sm font-bold text-gray-800">
//                       {activity.action} <span className="text-emerald-600">"{activity.targetName}"</span>
//                     </p>
//                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
//                       {getRelativeTime(activity.createdAt)}
//                     </p>
//                   </div>
//                 </div>
//                 {activity.targetId && (
//                   <button 
//                     onClick={() => navigate(`/${activity.type === 'document' ? 'documents' : activity.type}/${activity.targetId}`)}
//                     className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-emerald-600 transition-colors"
//                   >
//                     View Details
//                   </button>
//                 )}
//               </div>
//             ))
//           ) : (
//             <div className="p-20 text-center space-y-4">
//               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
//                 <FaFileAlt className="text-gray-200" />
//               </div>
//               <p className="text-xs font-black text-gray-300 uppercase tracking-[0.2em]">
//                 Your activity history is empty
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useEffect, useState } from "react";
import {
  FaFileAlt,
  FaLayerGroup,
  FaQuestionCircle,
  FaPlus,
  FaClock,
  FaSpinner,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const StatCard = ({ title, count, icon: Icon, iconColor, bgColor, to }) => (
  <Link
    to={to}
    className="group bg-white p-6 md:p-8 rounded-3xl md:rounded-4xl shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{title}</p>
        <h3 className="text-3xl md:text-4xl font-black text-gray-900 mt-1 md:mt-2 tracking-tighter">{count}</h3>
      </div>
      <div className={`p-4 md:p-5 rounded-2xl md:rounded-3xl ${bgColor} transition-all duration-500 group-hover:scale-110 shadow-sm`}>
        <Icon className={`h-6 w-6 md:h-8 md:w-8 ${iconColor}`} />
      </div>
    </div>
  </Link>
);

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState({
    stats: { totalDocs: 0, totalFlashcards: 0, totalQuizzes: 0 },
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  const cardStyles = {
    documents: { color: "text-blue-500", bg: "bg-blue-50" },
    flashcards: { color: "text-pink-500", bg: "bg-pink-50" },
    quizzes: { color: "text-emerald-500", bg: "bg-emerald-50" },
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/dashboard/stats");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const getRelativeTime = (date) => {
    const diff = Math.floor((new Date() - new Date(date)) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return new Date(date).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <FaSpinner className="text-emerald-500 animate-spin text-4xl" />
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Syncing your progress...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-0 space-y-6 md:space-y-10 animate-in fade-in zoom-in-95 duration-700">
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1 md:space-y-2">
          <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tighter uppercase leading-tight">
            Welcome back, <span className="text-emerald-500">{user?.name}</span>
          </h1>
          <p className="text-[10px] md:text-sm font-bold text-gray-400 uppercase tracking-widest">
            Ready to master something new today?
          </p>
        </div>
        <Link
          to="/documents"
          className="bg-gray-900 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all hover:shadow-xl hover:shadow-emerald-100 flex items-center justify-center gap-3 active:scale-95 shadow-lg shadow-gray-200 md:shadow-none"
        >
          <FaPlus size={12} /> Upload Document
        </Link>
      </div>

      {/* Real-time Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Documents"
          count={data.stats.totalDocs}
          icon={FaFileAlt}
          iconColor={cardStyles.documents.color}
          bgColor={cardStyles.documents.bg}
          to="/documents"
        />
        <StatCard
          title="Flashcards"
          count={data.stats.totalFlashcards}
          icon={FaLayerGroup}
          iconColor={cardStyles.flashcards.color}
          bgColor={cardStyles.flashcards.bg}
          to="/flashcards"
        />
        <StatCard
          title="Quizzes"
          count={data.stats.totalQuizzes}
          icon={FaQuestionCircle}
          iconColor={cardStyles.quizzes.color}
          bgColor={cardStyles.quizzes.bg}
          to="/quizzes"
        />
      </div>

      {/* Dynamic Recent Activity Section */}
      <div className="bg-white rounded-4xl md:rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 md:px-10 py-6 md:py-8 border-b border-gray-50 flex items-center gap-3">
          <div className="p-2.5 md:p-3 bg-emerald-50 text-emerald-500 rounded-xl md:rounded-2xl">
            <FaClock className="text-sm md:text-base" />
          </div>
          <h3 className="text-xs md:text-sm font-black text-gray-900 uppercase tracking-[0.2em]">Live Activity Feed</h3>
        </div>
        
        <div className="divide-y divide-gray-50">
          {data.recentActivity.length > 0 ? (
            data.recentActivity.map((activity) => (
              <div
                key={activity._id}
                className="px-6 md:px-10 py-5 md:py-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors group"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div className={`w-2 md:w-3 h-2 md:h-3 rounded-full shadow-sm animate-pulse shrink-0 ${
                    activity.type === "quiz" ? "bg-emerald-500" : 
                    activity.type === "flashcard" ? "bg-pink-500" : "bg-blue-500"
                  }`} />
                  <div className="min-w-0">
                    <p className="text-[11px] md:text-sm font-bold text-gray-800 truncate pr-2">
                      {activity.action} <span className="text-emerald-600">"{activity.targetName}"</span>
                    </p>
                    <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                      {getRelativeTime(activity.createdAt)}
                    </p>
                  </div>
                </div>
                {activity.targetId && (
                  <button 
                    onClick={() => navigate(`/${activity.type === 'document' ? 'documents' : activity.type}/${activity.targetId}`)}
                    className="shrink-0 text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-emerald-600 transition-colors border border-gray-100 md:border-none px-2 py-1 rounded-md md:p-0"
                  >
                    View
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="p-12 md:p-20 text-center space-y-4">
              <div className="w-12 md:w-16 h-12 md:h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                <FaFileAlt className="text-gray-200" />
              </div>
              <p className="text-[10px] md:text-xs font-black text-gray-300 uppercase tracking-[0.2em]">
                Your activity history is empty
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;