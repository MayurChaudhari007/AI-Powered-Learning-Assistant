// // import React, { useState, useEffect, useRef } from "react";
// // import { useAuth } from "../../context/AuthContext";
// // import { useApp } from "../../context/AppContext";
// // import {
// //   FaBars,
// //   FaSignOutAlt,
// //   FaBell,
// //   FaUser,
// //   FaChevronDown,
// // } from "react-icons/fa";
// // import { Link } from "react-router-dom";
// // import api from "../../api/axios"; // Import your axios instance

// // const Navbar = () => {
// //   const { user, logout } = useAuth();
// //   const { toggleSidebar } = useApp();
// //   const [showNotifications, setShowNotifications] = useState(false);
// //   const [showProfileMenu, setShowProfileMenu] = useState(false);
// //   const [notifications, setNotifications] = useState([]); // State for live alerts

// //   const notificationRef = useRef(null);
// //   const profileRef = useRef(null);
// //   const getRelativeTime = (date) => {
// //     const diff = Math.floor((new Date() - new Date(date)) / 1000);
// //     if (diff < 60) return "Just now";
// //     if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
// //     if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
// //     return new Date(date).toLocaleDateString();
// //   };
// //   // Fetch notifications specifically for the Navbar
// //   useEffect(() => {
// //     const fetchNotifications = async () => {
// //       try {
// //         const response = await api.get("/dashboard/stats");
// //         setNotifications(response.data.recentActivity || []);
// //       } catch (error) {
// //         console.error("Error fetching notifications", error);
// //       }
// //     };
// //     if (user) fetchNotifications();
// //   }, [user]);

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (
// //         notificationRef.current &&
// //         !notificationRef.current.contains(event.target)
// //       )
// //         setShowNotifications(false);
// //       if (profileRef.current && !profileRef.current.contains(event.target))
// //         setShowProfileMenu(false);
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   return (
// //     <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 h-20 flex items-center justify-between px-4 lg:px-10">
// //       <div className="flex items-center">
// //         <button onClick={toggleSidebar} className="p-2 text-gray-500 lg:hidden">
// //           <FaBars size={22} />
// //         </button>
// //       </div>

// //       <div className="flex items-center gap-2 lg:gap-5">
// //         {/* Notifications Dropdown */}
// //         <div className="relative" ref={notificationRef}>
// //           <button
// //             onClick={() => {
// //               setShowNotifications(!showNotifications);
// //               setShowProfileMenu(false);
// //             }}
// //             className={`relative p-3 rounded-2xl transition-all ${showNotifications ? "bg-emerald-100 text-emerald-600" : "text-gray-500 hover:bg-gray-50"}`}
// //           >
// //             <FaBell size={20} />
// //             {notifications.length > 0 && (
// //               <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
// //             )}
// //           </button>

// //           {showNotifications && (
// //             <div className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-gray-50 py-4 animate-in fade-in slide-in-from-top-2 duration-200">
// //               <div className="px-6 py-2 border-b border-gray-50 flex justify-between items-center">
// //                 <span className="text-xs font-black uppercase tracking-widest text-gray-900">
// //                   Recent Updates
// //                 </span>
// //               </div>
// //               <div className="max-h-80 overflow-y-auto mt-2">
// //                 {notifications.length > 0 ? (
// //                   notifications.map((activity) => (
// //                     // <div key={activity._id} className="px-6 py-3 hover:bg-gray-50 transition-colors cursor-default border-b border-gray-50 last:border-0">
// //                     //   <p className="text-[11px] font-bold text-gray-800">
// //                     //     {activity.action} <span className="text-emerald-600">"{activity.targetName}"</span>
// //                     //   </p>
// //                     //   <p className="text-[9px] font-black text-gray-400 uppercase mt-1">
// //                     //     Just Now
// //                     //   </p>
// //                     // </div>
// //                     // inside the notifications.map((activity) => ( ... )) block
// //                     <Link
// //                       key={activity._id}
// //                       to={
// //                         activity.targetId
// //                           ? `/${activity.type === "document" ? "documents" : activity.type}/${activity.targetId}`
// //                           : "#"
// //                       }
// //                       className="px-6 py-4 flex items-start gap-3 hover:bg-emerald-50/50 transition-all cursor-pointer border-b border-gray-50 last:border-0 group"
// //                       onClick={() => setShowNotifications(false)} // Close dropdown on click
// //                     >
// //                       {/* Small indicator dot */}
// //                       <div
// //                         className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
// //                           activity.type === "quiz"
// //                             ? "bg-emerald-500"
// //                             : activity.type === "flashcard"
// //                               ? "bg-pink-500"
// //                               : "bg-blue-500"
// //                         }`}
// //                       />

// //                       <div className="flex-1">
// //                         <p className="text-[11px] font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">
// //                           {activity.action}{" "}
// //                           <span className="text-emerald-600">
// //                             "{activity.targetName}"
// //                           </span>
// //                         </p>
// //                         <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">
// //                           {getRelativeTime(activity.createdAt)}
// //                         </p>
// //                       </div>
// //                     </Link>
// //                   ))
// //                 ) : (
// //                   <p className="text-center py-8 text-xs font-bold text-gray-400 uppercase tracking-widest">
// //                     No new alerts
// //                   </p>
// //                 )}
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* User Profile Menu */}
// //         <div className="relative" ref={profileRef}>
// //           <button
// //             onClick={() => {
// //               setShowProfileMenu(!showProfileMenu);
// //               setShowNotifications(false);
// //             }}
// //             className="flex items-center gap-3 p-1.5 pr-3 rounded-2xl hover:bg-gray-50 transition-all"
// //           >
// //             <div className="h-10 w-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black shadow-md">
// //               {user?.name?.charAt(0)}
// //             </div>
// //             <div className="hidden sm:block text-left">
// //               <p className="text-xs font-black text-gray-900 uppercase tracking-tighter leading-none">
// //                 {user?.name?.split(" ")[0]}
// //               </p>
// //               <FaChevronDown size={10} className="text-gray-400 mt-1" />
// //             </div>
// //           </button>

// //           {showProfileMenu && (
// //             <div className="absolute right-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl border border-gray-50 py-3 animate-in fade-in slide-in-from-top-2 duration-200">
// //               <div className="px-6 py-3 border-b border-gray-50 mb-2">
// //                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
// //                   Account
// //                 </p>
// //                 <p className="text-xs font-bold text-gray-900 truncate mt-1">
// //                   {user?.email}
// //                 </p>
// //               </div>
// //               <Link
// //                 to="/profile"
// //                 className="flex items-center gap-3 px-6 py-3 text-xs font-bold text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors uppercase tracking-widest"
// //                 onClick={() => setShowProfileMenu(false)}
// //               >
// //                 <FaUser className="opacity-50" /> Profile
// //               </Link>
// //               <div className="h-px bg-gray-50 my-2"></div>
// //               <button
// //                 onClick={logout}
// //                 className="w-full flex items-center gap-3 px-6 py-3 text-xs font-bold text-rose-500 hover:bg-rose-50 transition-colors uppercase tracking-widest text-left"
// //               >
// //                 <FaSignOutAlt /> Sign Out
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </header>
// //   );
// // };

// // export default Navbar;





// import React, { useState, useEffect, useRef } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { useApp } from "../../context/AppContext";
// import {
//   FaBars,
//   FaSignOutAlt,
//   FaBell,
//   FaUser,
//   FaChevronDown,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import api from "../../api/axios";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const { toggleSidebar } = useApp();
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [notifications, setNotifications] = useState([]);

//   const notificationRef = useRef(null);
//   const profileRef = useRef(null);

//   const getRelativeTime = (date) => {
//     const diff = Math.floor((new Date() - new Date(date)) / 1000);
//     if (diff < 60) return "Just now";
//     if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
//     if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
//     return new Date(date).toLocaleDateString();
//   };

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await api.get("/dashboard/stats");
//         setNotifications(response.data.recentActivity || []);
//       } catch (error) {
//         console.error("Error fetching notifications", error);
//       }
//     };
//     if (user) fetchNotifications();
//   }, [user]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (notificationRef.current && !notificationRef.current.contains(event.target))
//         setShowNotifications(false);
//       if (profileRef.current && !profileRef.current.contains(event.target))
//         setShowProfileMenu(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 md:h-20 flex items-center justify-between px-4 lg:px-10 transition-all">
//       {/* Mobile Sidebar Toggle */}
//       <div className="flex items-center">
//         <button 
//           onClick={toggleSidebar} 
//           className="p-2 -ml-2 text-gray-500 lg:hidden hover:text-emerald-600 transition-colors"
//         >
//           <FaBars size={20} />
//         </button>
//       </div>

//       <div className="flex items-center gap-1 sm:gap-2 lg:gap-5">
//         {/* Notifications Dropdown */}
//         <div className="relative" ref={notificationRef}>
//           <button
//             onClick={() => {
//               setShowNotifications(!showNotifications);
//               setShowProfileMenu(false);
//             }}
//             className={`relative p-2.5 sm:p-3 rounded-xl sm:rounded-2xl transition-all ${
//               showNotifications ? "bg-emerald-100 text-emerald-600" : "text-gray-500 hover:bg-gray-50"
//             }`}
//           >
//             <FaBell className="text-lg sm:text-xl" />
//             {notifications.length > 0 && (
//               <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
//             )}
//           </button>

//           {showNotifications && (
//             <div className="absolute right-12.5 sm:right-0 mt-3 w-70 sm:w-80 bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-50 py-3 sm:py-4 animate-in fade-in slide-in-from-top-2 duration-200">
//               <div className="px-5 sm:px-6 py-2 border-b border-gray-50 flex justify-between items-center">
//                 <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-gray-900">
//                   Recent Updates
//                 </span>
//               </div>
//               <div className="max-h-64 sm:max-h-80 overflow-y-auto mt-2">
//                 {notifications.length > 0 ? (
//                   notifications.map((activity) => (
//                     <Link
//                       key={activity._id}
//                       to={activity.targetId ? `/${activity.type === "document" ? "documents" : activity.type}/${activity.targetId}` : "#"}
//                       className="px-5 sm:px-6 py-3 sm:py-4 flex items-start gap-3 hover:bg-emerald-50/50 transition-all cursor-pointer border-b border-gray-50 last:border-0 group"
//                       onClick={() => setShowNotifications(false)}
//                     >
//                       <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
//                         activity.type === "quiz" ? "bg-emerald-500" : activity.type === "flashcard" ? "bg-pink-500" : "bg-blue-500"
//                       }`} />
//                       <div className="flex-1">
//                         <p className="text-[10px] sm:text-[11px] font-bold text-gray-800 group-hover:text-emerald-700 transition-colors leading-tight">
//                           {activity.action} <span className="text-emerald-600">"{activity.targetName}"</span>
//                         </p>
//                         <p className="text-[8px] sm:text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">
//                           {getRelativeTime(activity.createdAt)}
//                         </p>
//                       </div>
//                     </Link>
//                   ))
//                 ) : (
//                   <p className="text-center py-8 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">
//                     No new alerts
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* User Profile Menu */}
//         <div className="relative" ref={profileRef}>
//           <button
//             onClick={() => {
//               setShowProfileMenu(!showProfileMenu);
//               setShowNotifications(false);
//             }}
//             className="flex items-center gap-2 sm:gap-3 p-1 sm:p-1.5 pr-2 sm:pr-3 rounded-xl sm:rounded-2xl hover:bg-gray-50 transition-all border border-transparent active:scale-95 lg:active:scale-100"
//           >
//             <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black shadow-md text-sm sm:text-base">
//               {user?.name?.charAt(0)}
//             </div>
//             <div className="hidden sm:block text-left">
//               <p className="text-[10px] sm:text-xs font-black text-gray-900 uppercase tracking-tighter leading-none">
//                 {user?.name?.split(" ")[0]}
//               </p>
//               <FaChevronDown size={8} className="text-gray-400 mt-1" />
//             </div>
//           </button>

//           {showProfileMenu && (
//             <div className="absolute right-0 mt-3 w-48 sm:w-56 bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-50 py-2 sm:py-3 animate-in fade-in slide-in-from-top-2 duration-200">
//               <div className="px-5 sm:px-6 py-2 sm:py-3 border-b border-gray-50 mb-1 sm:mb-2">
//                 <p className="text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">
//                   Account
//                 </p>
//                 <p className="text-[10px] sm:text-xs font-bold text-gray-900 truncate mt-0.5 sm:mt-1">
//                   {user?.email}
//                 </p>
//               </div>
//               <Link
//                 to="/profile"
//                 className="flex items-center gap-3 px-5 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs font-bold text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors uppercase tracking-widest"
//                 onClick={() => setShowProfileMenu(false)}
//               >
//                 <FaUser className="opacity-50 text-sm" /> Profile
//               </Link>
//               <div className="h-px bg-gray-50 my-1 sm:my-2"></div>
//               <button
//                 onClick={logout}
//                 className="w-full flex items-center gap-3 px-5 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs font-bold text-rose-500 hover:bg-rose-50 transition-colors uppercase tracking-widest text-left"
//               >
//                 <FaSignOutAlt className="text-sm" /> Sign Out
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;



import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import {
  FaBars,
  FaSignOutAlt,
  FaBell,
  FaUser,
  FaChevronDown,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { toggleSidebar } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const getRelativeTime = (date) => {
    const diff = Math.floor((new Date() - new Date(date)) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return new Date(date).toLocaleDateString();
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get("/dashboard/stats");
        setNotifications(response.data.recentActivity || []);
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };
    if (user) fetchNotifications();
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target))
        setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(event.target))
        setShowProfileMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 md:h-20 flex items-center justify-between px-4 lg:px-10">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="p-2 text-gray-500 lg:hidden hover:text-emerald-600 transition-colors">
          <FaBars size={20} />
        </button>
      </div>

      <div className="flex items-center gap-2 lg:gap-5">
        {/* Notifications Dropdown */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className={`relative p-2.5 sm:p-3 rounded-xl transition-all ${
              showNotifications ? "bg-emerald-100 text-emerald-600" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <FaBell size={18} className="sm:text-[20px]" />
            {notifications.length > 0 && (
              <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
            )}
          </button>

          {showNotifications && (
            /* FIX: Added 'fixed' or 'absolute' with right-0 and max-vw constraints for mobile */
            <div className="absolute -right-10 sm:right-0 mt-3 w-[calc(100vw-32px)] sm:w-80 max-w-85 bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-50 py-3 sm:py-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-5 sm:px-6 py-2 border-b border-gray-50 flex justify-between items-center">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-gray-900">
                  Recent Updates
                </span>
              </div>
              <div className="max-h-[60vh] sm:max-h-80 overflow-y-auto mt-2 custom-scrollbar">
                {notifications.length > 0 ? (
                  notifications.map((activity) => (
                    <Link
                      key={activity._id}
                      to={activity.targetId ? `/${activity.type === "document" ? "documents" : activity.type}/${activity.targetId}` : "#"}
                      className="px-5 sm:px-6 py-3 sm:py-4 flex items-start gap-3 hover:bg-emerald-50/50 transition-all cursor-pointer border-b border-gray-50 last:border-0 group"
                      onClick={() => setShowNotifications(false)}
                    >
                      <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                        activity.type === "quiz" ? "bg-emerald-500" : activity.type === "flashcard" ? "bg-pink-500" : "bg-blue-500"
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] sm:text-[11px] font-bold text-gray-800 group-hover:text-emerald-700 transition-colors leading-snug">
                          {activity.action} <span className="text-emerald-600">"{activity.targetName}"</span>
                        </p>
                        <p className="text-[8px] sm:text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">
                          {getRelativeTime(activity.createdAt)}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-center py-8 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">
                    No new alerts
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 sm:gap-3 p-1 sm:p-1.5 pr-2 sm:pr-3 rounded-xl hover:bg-gray-50 transition-all"
          >
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black shadow-md text-sm">
              {user?.name?.charAt(0)}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-[10px] sm:text-xs font-black text-gray-900 uppercase tracking-tighter leading-none">
                {user?.name?.split(" ")[0]}
              </p>
              <FaChevronDown size={8} className="text-gray-400 mt-1" />
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-48 sm:w-56 bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-50 py-2 sm:py-3 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-5 sm:px-6 py-2 sm:py-3 border-b border-gray-50 mb-1 sm:mb-2">
                <p className="text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Account
                </p>
                <p className="text-[10px] sm:text-xs font-bold text-gray-900 truncate mt-0.5 sm:mt-1">
                  {user?.email}
                </p>
              </div>
              <Link
                to="/profile"
                className="flex items-center gap-3 px-5 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs font-bold text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors uppercase tracking-widest"
                onClick={() => setShowProfileMenu(false)}
              >
                <FaUser className="opacity-50" /> Profile
              </Link>
              <div className="h-px bg-gray-50 my-1 sm:my-2"></div>
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-5 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs font-bold text-rose-500 hover:bg-rose-50 transition-colors uppercase tracking-widest text-left"
              >
                <FaSignOutAlt /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;