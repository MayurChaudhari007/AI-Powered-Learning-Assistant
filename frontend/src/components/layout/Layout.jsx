
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useApp } from "../../context/AppContext";

const Layout = () => {
  const { sidebarOpen, toggleSidebar } = useApp();

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
      {/* Sidebar Overlay for Mobile - Smooth Fade */}
      <div
        className={`fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Navbar */}
        <Navbar />

        {/* Dynamic Content Rendering */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-2 lg:p-2 max-w-400 mx-auto min-h-full">
            {/* The Outlet renders your Dashboard, DocumentList, etc. */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;