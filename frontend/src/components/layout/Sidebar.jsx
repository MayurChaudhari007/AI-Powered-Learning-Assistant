

// import React from "react";
// import { NavLink } from "react-router-dom";
// import { useApp } from "../../context/AppContext";
// import {
//   FaHome,
//   FaFileAlt,
//   FaLayerGroup,
//   FaQuestionCircle,
//   FaTimes,
//   FaBrain,
//   FaUserCircle
// } from "react-icons/fa";
// import clsx from "clsx";

// const Sidebar = () => {
//   const { sidebarOpen, toggleSidebar } = useApp();

//   const navItems = [
//     { name: "Dashboard", path: "/", icon: FaHome },
//     { name: "Documents", path: "/documents", icon: FaFileAlt },
//     { name: "Flashcards", path: "/flashcards", icon: FaLayerGroup },
//     { name: "Quizzes", path: "/quizzes", icon: FaQuestionCircle },
//     { name: "Profile", path: "/profile", icon: FaUserCircle },
//   ];

//   return (
//     <aside
//       className={clsx(
//         "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
//         sidebarOpen ? "translate-x-0" : "-translate-x-full",
//       )}
//     >
//       {/* Brand Logo Section */}
//       <div className="flex items-center justify-between h-20 px-6 border-b border-gray-50">
//         <div className="flex items-center gap-3">
//           <div className="bg-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-100">
//             <FaBrain className="text-white text-xl" />
//           </div>
//           <span className="text-xl font-bold text-gray-900 tracking-tight">
//             AI Learning <span className="text-emerald-600">Assistant</span>
//           </span>
//         </div>
//         <button
//           onClick={toggleSidebar}
//           className="lg:hidden text-gray-400 hover:text-emerald-600 p-2 rounded-lg hover:bg-emerald-50 transition-all"
//         >
//           <FaTimes size={20} />
//         </button>
//       </div>

//       {/* Navigation Links */}
//       <nav className="p-6 space-y-3">
//         {navItems.map((item) => (
//           <NavLink
//             key={item.path}
//             to={item.path}
//             className={({ isActive }) =>
//               clsx(
//                 "group flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden",
//                 isActive
//                   ? "bg-emerald-50 text-emerald-700 font-bold shadow-sm"
//                   : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
//               )
//             }
//           >
//             {/* Active Indicator Bar */}
//             {({ isActive }) => (
//               <>
//                 {isActive && (
//                   <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-emerald-600 rounded-r-full" />
//                 )}
//                 <item.icon className={clsx(
//                   "mr-4 text-xl transition-colors",
//                   isActive ? "text-emerald-600" : "text-gray-400 group-hover:text-gray-900"
//                 )} />
//                 <span className="tracking-wide text-sm">{item.name}</span>
//               </>
//             )}
//           </NavLink>
//         ))}
//       </nav>

//       {/* Sidebar Footer / CTA */}
//       <div className="absolute bottom-0 left-0 right-0 p-6">
//         <div className="bg-linear-to-br from-emerald-600 to-teal-700 rounded-2xl p-5 shadow-xl shadow-emerald-100 relative overflow-hidden">
//           <FaBrain className="absolute -right-4 -bottom-4 text-white/10 text-7xl rotate-12" />
//           <h4 className="text-white font-bold text-sm relative z-10">Study Smarter</h4>
//           <p className="text-emerald-50/80 text-xs mt-1 relative z-10">Upload your PDFs and let AI guide your learning journey.</p>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;



import React from "react";
import { NavLink } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import {
  FaHome,
  FaFileAlt,
  FaLayerGroup,
  FaQuestionCircle,
  FaTimes,
  FaBrain,
  FaUserCircle
} from "react-icons/fa";
import clsx from "clsx";

const Sidebar = () => {
  const { sidebarOpen, toggleSidebar } = useApp();

  const navItems = [
    { name: "Dashboard", path: "/", icon: FaHome },
    { name: "Documents", path: "/documents", icon: FaFileAlt },
    { name: "Flashcards", path: "/flashcards", icon: FaLayerGroup },
    { name: "Quizzes", path: "/quizzes", icon: FaQuestionCircle },
    { name: "Profile", path: "/profile", icon: FaUserCircle },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-64 md:w-72 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Brand Logo Section */}
        <div className="flex items-center justify-between h-20 px-4 md:px-6 border-b border-gray-50">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="bg-emerald-600 p-1.5 md:p-2 rounded-xl shadow-lg shadow-emerald-100">
              <FaBrain className="text-white text-lg md:text-xl" />
            </div>
            <span className="text-lg md:text-xl font-bold text-gray-900 tracking-tight leading-tight">
              AI Learning <span className="text-emerald-600 lg:block xl:inline">Assistant</span>
            </span>
          </div>
          {/* Close button for mobile */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-gray-400 hover:text-emerald-600 p-2 rounded-lg hover:bg-emerald-50 transition-all"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 md:p-6 space-y-2 md:space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => { if(window.innerWidth < 1024) toggleSidebar(); }} // Auto-close on mobile selection
              className={({ isActive }) =>
                clsx(
                  "group flex items-center px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden",
                  isActive
                    ? "bg-emerald-50 text-emerald-700 font-bold shadow-sm"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-emerald-600 rounded-r-full" />
                  )}
                  <item.icon className={clsx(
                    "mr-3 md:mr-4 text-lg md:text-xl transition-colors",
                    isActive ? "text-emerald-600" : "text-gray-400 group-hover:text-gray-900"
                  )} />
                  <span className="tracking-wide text-xs md:text-sm uppercase font-black">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer - Responsive adjustment */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 hidden sm:block">
          <div className="bg-linear-to-br from-emerald-600 to-teal-700 rounded-2xl p-4 md:p-5 shadow-xl shadow-emerald-100 relative overflow-hidden">
            <FaBrain className="absolute -right-4 -bottom-4 text-white/10 text-6xl md:text-7xl rotate-12" />
            <h4 className="text-white font-bold text-xs md:text-sm relative z-10 uppercase tracking-widest">Study Smarter</h4>
            <p className="text-emerald-50/80 text-[10px] md:text-xs mt-1 relative z-10 font-bold uppercase leading-tight">AI-guided learning journey.</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;