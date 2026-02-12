
// import { createContext, useContext, useState, useEffect } from "react";
// import api from "../api/axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       if (token) {
//         try {
//           // It is better to verify the token with the /me endpoint on refresh
//           const response = await api.get("/auth/me");
//           setUser(response.data);
//         } catch (error) {
//           logout();
//         }
//       }
//       setLoading(false);
//     };
//     fetchUser();
//   }, [token]);

//   const login = async (email, password) => {
//     try {
//       const response = await api.post("/auth/login", { email, password });
//       const { token, user } = response.data;

//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));
//       setToken(token);
//       setUser(user);
//       return { success: true };
//     } catch (error) {
//       // This captures the 'Invalid Credentials' message from your backend
//       const errorMessage =
//         error.response?.data?.message || "Login failed. Please try again.";
//       return {
//         success: false,
//         error: errorMessage,
//       };
//     }
//   };

//   const register = async (name, email, password) => {
//     try {
//       const response = await api.post("/auth/register", {
//         name,
//         email,
//         password,
//       });
//       const { token, user } = response.data;

//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));
//       setToken(token);
//       setUser(user);
//       return { success: true };
//     } catch (error) {
//       return {
//         success: false,
//         error: error.response?.data?.message || "Registration failed",
//       };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, token, login, register, logout, loading }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);





import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // --- 1. Internal Logout Utility ---
  // Memoized to prevent unnecessary re-renders in useEffect
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    // Optional: Force redirect to login if not already there
  }, []);

  // --- 2. Initial Auth Validation ---
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          // Verify token with backend /me endpoint
          const response = await api.get("/auth/me");
          setUser(response.data);
        } catch (error) {
          console.error("Session expired or invalid token");
          logout(); // Auto-logout if token is invalid or expired
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [token, logout]);

  // --- 3. Login Handler ---
  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token: newToken, user: userData } = response.data;

      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(userData));
      setToken(newToken);
      setUser(userData);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
      return { success: false, error: errorMessage };
    }
  };

  // --- 4. Registration Handler ---
  const register = async (name, email, password) => {
    try {
      const response = await api.post("/auth/register", { name, email, password });
      const { token: newToken, user: userData } = response.data;

      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(userData));
      setToken(newToken);
      setUser(userData);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed. Try a different email.",
      };
    }
  };

  // --- 5. Profile Sync Handler (NEW) ---
  // Call this after updateProfile in your Profile.jsx to keep the UI in sync
  const updateUserSettings = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // --- 6. Absolute Delete Handler (NEW) ---
  // Complements your backend deleteProfile logic
  const deleteAccount = async (password) => {
    try {
      await api.delete("/auth/profile", { data: { password } });
      logout(); // Wipe local state after successful backend purge
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Account deletion failed. Check your password.",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        token, 
        login, 
        register, 
        logout, 
        updateUserSettings, // For real-time name/profile changes
        deleteAccount,      // Centralized deletion logic
        loading 
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};