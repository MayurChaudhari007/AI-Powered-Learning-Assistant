import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Logic: Initialize as false on mobile (width <= 1024) to prevent auto-opening
  // Standardized variable name to 'sidebarOpen' to match Layout/Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Helper function to force close on mobile link clicks
  const closeSidebar = () => {
    if (window.innerWidth <= 1024) setSidebarOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      // Automatically adjust state based on screen size changes
      if (window.innerWidth <= 1024) {
        setSidebarOpen(false); // Hide on mobile
      } else {
        setSidebarOpen(true); // Show on desktop
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AppContext.Provider value={{ sidebarOpen, toggleSidebar, closeSidebar }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);