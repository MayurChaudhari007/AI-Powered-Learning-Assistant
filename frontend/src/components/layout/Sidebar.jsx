


import React from "react";
import { NavLink } from "react-router-dom";
import { 
  FaHome, FaFileAlt, FaLayerGroup, 
  FaQuestionCircle, FaUserCircle, FaTimes, FaBrain 
} from "react-icons/fa";
import { useApp } from "../../context/AppContext";
import clsx from "clsx";

const Sidebar = () => {
  // Using 'sidebarOpen' to match your Layout and Context variable names
  const { sidebarOpen, toggleSidebar } = useApp();

  const navItems = [
    { name: "Dashboard", path: "/", icon: FaHome },
    { name: "Documents", path: "/documents", icon: FaFileAlt },
    { name: "Flashcards", path: "/flashcards", icon: FaLayerGroup },
    { name: "Quizzes", path: "/quizzes", icon: FaQuestionCircle },
    { name: "Profile", path: "/profile", icon: FaUserCircle },
  ];

  // Helper to handle closing sidebar on mobile clicks
  const handleNavClick = () => {
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  return (
    <aside
      className={clsx(
        "fixed top-0 left-0 h-full bg-white z-50 transition-all duration-300 ease-in-out border-r border-gray-100",
        "w-72 lg:static", 
        // Logic: On mobile, slide out based on state. On desktop, toggle between wide and mini
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-20"
      )}
    >
      <div className="flex flex-col h-full p-4">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div className={clsx("flex items-center gap-2", !sidebarOpen && "lg:hidden")}>
            <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <FaBrain size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-gray-900 leading-none tracking-tighter uppercase text-sm">
                AI Learning
              </span>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-0.5">
                Assistant
              </span>
            </div>
          </div>
          
          {/* Mobile Close Button - Only visible when open on small screens */}
          <button 
            onClick={toggleSidebar} 
            className="lg:hidden p-2 text-gray-400 hover:text-emerald-600 transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              // Force close sidebar on mobile after selection
              onClick={handleNavClick}
              className={({ isActive }) => clsx(
                "flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all text-[11px] uppercase tracking-widest",
                isActive 
                  ? "bg-emerald-50 text-emerald-600 shadow-sm shadow-emerald-100/50" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              )}
            >
              <item.icon size={20} className="shrink-0" />
              <span className={clsx(
                "transition-opacity duration-300",
                !sidebarOpen && "lg:hidden"
              )}>
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer (Optional decoration) */}
        {sidebarOpen && (
          <div className="mt-auto p-4 bg-gray-50 rounded-2xl border border-gray-100 hidden lg:block">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">
              Version
            </p>
            <p className="text-xs font-bold text-gray-600">1.0.1 Stable</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;