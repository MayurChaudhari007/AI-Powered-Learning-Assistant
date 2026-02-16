


import React, { useEffect } from "react"; // Added useEffect
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useApp } from "../../context/AppContext";

const Layout = () => {
  const { sidebarOpen, toggleSidebar } = useApp();

  // FIX: Force sidebar to close on mobile load/refresh
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    // If it's mobile and the global state says it's open, close it once
    if (isMobile && sidebarOpen) {
      toggleSidebar();
    }
  }, []); // Empty dependency array means this runs only once on mount

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
      {/* Sidebar Overlay for Mobile */}
      <div
        className={`fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Navbar />

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {/* Changed p-2 to p-4 for better mobile spacing */}
          <div className="p-4 lg:p-8 w-full mx-auto min-h-full">
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