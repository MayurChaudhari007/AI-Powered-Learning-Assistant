import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <AppContext.Provider value={{ theme, setTheme, sidebarOpen, toggleSidebar }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
