import React, { useState, useEffect } from "react";
import { 
  FaUser, FaLock, FaTrashAlt, FaExclamationTriangle, 
  FaCheckCircle, FaSpinner, FaShieldAlt, FaSignature 
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

const Profile = () => {
  const { user, updateUserSettings, logout } = useAuth();
  
  // --- 1. State Management ---
  const [name, setName] = useState("");
  const [security, setSecurity] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  
  // Deletion States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Sync state with Context user data
  useEffect(() => {
    if (user) setName(user.name);
  }, [user]);

  // --- 2. Handlers ---

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    if (security.newPassword && security.newPassword !== security.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" });
      setLoading(false);
      return;
    }

    try {
      const payload = {
        name,
        ...(security.newPassword && { 
          oldPassword: security.oldPassword, 
          newPassword: security.newPassword 
        })
      };

      const res = await api.put("/auth/profile", payload);
      updateUserSettings(res.data.user);
      
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setSecurity({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setMessage({ 
        type: "error", 
        text: err.response?.data?.message || "Update failed. Check current password." 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) return;
    setIsDeleting(true);
    try {
      await api.delete("/auth/profile", { data: { password: deletePassword } });
      logout(); 
    } catch (err) {
      alert(err.response?.data?.message || "Incorrect password. Deletion failed.");
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-10 py-6 md:py-10 space-y-6 md:space-y-10 animate-in fade-in duration-700">
      
      {/* Header Info Card - Optimized for Mobile */}
      <div className="bg-white rounded-4xl md:rounded-[40px] border border-gray-100 p-6 md:p-12 shadow-sm flex flex-col md:flex-row items-center gap-6 md:gap-8 relative overflow-hidden text-center md:text-left">
        <div className="absolute top-0 right-0 p-6 md:p-12 opacity-[0.03] pointer-events-none">
          <FaUser className="text-[100px] md:text-[150px]" />
        </div>
        
        <div className="w-24 h-24 md:w-32 md:h-32 bg-emerald-500 text-white rounded-[28px] md:rounded-[35px] flex items-center justify-center text-4xl md:text-5xl font-black shadow-xl shadow-emerald-100 shrink-0">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        
        <div className="space-y-1 md:space-y-2 min-w-0">
          <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tighter uppercase truncate px-2">
            {user?.name || "User Profile"}
          </h1>
          <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 font-bold text-[10px] md:text-xs uppercase tracking-widest">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="truncate">{user?.email}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
        
        {/* Left Side: Forms */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          <form onSubmit={handleUpdateProfile} className="space-y-6 md:space-y-8">
            
            {/* Identity Section */}
            <div className="bg-white p-6 md:p-10 rounded-4xl md:rounded-[40px] border border-gray-100 shadow-sm space-y-5 md:space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl md:rounded-2xl shrink-0">
                  <FaSignature size={16} className="md:size-4.5" />
                </div>
                <div>
                  <h3 className="text-xs md:text-sm font-black text-gray-900 uppercase tracking-widest">Identity</h3>
                  <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase">Public Display Name</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase ml-2">Display Name</label>
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 md:p-5 bg-gray-50 border-2 border-transparent focus:border-emerald-500/20 focus:bg-white rounded-2xl md:rounded-3xl text-sm font-bold transition-all outline-none"
                  placeholder="Your Name"
                />
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-white p-6 md:p-10 rounded-4xl md:rounded-[40px] border border-gray-100 shadow-sm space-y-5 md:space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl md:rounded-2xl shrink-0">
                  <FaLock size={16} className="md:size-4.5" />
                </div>
                <div>
                  <h3 className="text-xs md:text-sm font-black text-gray-900 uppercase tracking-widest">Security</h3>
                  <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase">Change Password</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[9px] md:text-[10px] font-black text-red-400 uppercase ml-2">Current Password (Required for change)</label>
                  <input 
                    type="password"
                    value={security.oldPassword}
                    onChange={(e) => setSecurity({...security, oldPassword: e.target.value})}
                    className="w-full p-4 md:p-5 bg-gray-50 border-2 border-transparent focus:border-emerald-500/20 focus:bg-white rounded-2xl md:rounded-3xl text-sm font-bold transition-all outline-none"
                    placeholder="Verify current password"
                  />
                </div>
                <input 
                  type="password"
                  placeholder="New Password"
                  value={security.newPassword}
                  onChange={(e) => setSecurity({...security, newPassword: e.target.value})}
                  className="w-full p-4 md:p-5 bg-gray-50 border-2 border-transparent focus:border-emerald-500/20 focus:bg-white rounded-2xl md:rounded-3xl text-sm font-bold transition-all outline-none"
                />
                <input 
                  type="password"
                  placeholder="Confirm Password"
                  value={security.confirmPassword}
                  onChange={(e) => setSecurity({...security, confirmPassword: e.target.value})}
                  className="w-full p-4 md:p-5 bg-gray-50 border-2 border-transparent focus:border-emerald-500/20 focus:bg-white rounded-2xl md:rounded-3xl text-sm font-bold transition-all outline-none"
                />
              </div>
            </div>

            {/* Status Message */}
            {message.text && (
              <div className={`p-4 md:p-5 rounded-2xl md:rounded-3xl text-[10px] md:text-xs font-bold flex items-center gap-3 animate-in slide-in-from-top-2 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {message.type === 'success' ? <FaCheckCircle /> : <FaExclamationTriangle />}
                {message.text}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 md:py-6 bg-gray-900 text-white text-[10px] md:text-[11px] font-black uppercase rounded-2xl md:rounded-[30px] flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all shadow-xl shadow-gray-200 active:scale-95 disabled:opacity-50"
            >
              {loading ? <FaSpinner className="animate-spin" /> : "Save All Changes"}
            </button>
          </form>
        </div>

        {/* Right Side: Info & Danger Zone */}
        <div className="space-y-6 md:space-y-8">
          <div className="bg-emerald-600 p-6 md:p-8 rounded-4xl md:rounded-[40px] text-white shadow-2xl shadow-emerald-100 relative overflow-hidden group">
            <FaShieldAlt className="absolute -right-4 -bottom-4 text-[120px] md:text-[180px] opacity-10 rotate-12 transition-all duration-1000" />
            <div className="relative z-10 space-y-3 md:space-y-4">
              <h4 className="font-black text-base md:text-lg uppercase tracking-widest leading-none">Privacy Shield</h4>
              <p className="text-[11px] md:text-xs font-medium leading-relaxed opacity-80">
                Your study materials and data are encrypted and stored securely in your private cloud vault.
              </p>
            </div>
          </div>

          <div className="bg-red-50/50 p-6 md:p-8 rounded-4xl md:rounded-[40px] border border-red-100 space-y-4 md:space-y-6">
            <div className="flex items-center gap-2 text-red-600 font-black text-[9px] md:text-[10px] uppercase tracking-widest">
              <FaExclamationTriangle size={12} /> Danger Zone
            </div>
            <p className="text-[10px] md:text-[11px] text-gray-500 font-bold leading-relaxed">
              Once deleted, there is no going back. All PDFs, cards, and quizzes will be purged.
            </p>
            <button 
              onClick={() => setIsDeleteModalOpen(true)}
              className="w-full py-3.5 md:py-4 bg-white border-2 border-red-100 text-red-600 text-[10px] font-black uppercase rounded-xl md:rounded-2xl hover:bg-red-600 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <FaTrashAlt size={10} /> Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Delete Modal - Responsive Adjustments */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-100 bg-gray-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-4xl md:rounded-[45px] p-8 md:p-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-red-50 text-red-500 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8">
              <FaExclamationTriangle size={28} className="md:size-8" />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-gray-900 text-center uppercase tracking-tighter leading-none">Permanent Delete?</h3>
            <p className="text-[8px] md:text-[10px] text-gray-400 text-center font-black uppercase tracking-[0.2em] mt-3 mb-6 md:mb-10">
              This action is irreversible
            </p>

            <div className="space-y-5 md:space-y-6">
              <div className="space-y-1.5">
                <label className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase ml-2">Confirm Password</label>
                <input 
                  type="password" 
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className="w-full p-4 md:p-5 bg-gray-50 border-none rounded-2xl md:rounded-3xl text-sm font-bold focus:ring-2 focus:ring-red-500/20 outline-none" 
                  placeholder="••••••••"
                />
              </div>
              
              <div className="flex flex-col gap-2 md:gap-3">
                <button 
                  onClick={handleDeleteAccount}
                  disabled={!deletePassword || isDeleting}
                  className="w-full py-4 md:py-5 bg-red-600 text-white text-[10px] md:text-[11px] font-black uppercase rounded-2xl md:rounded-[25px] hover:bg-red-700 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isDeleting ? <FaSpinner className="animate-spin" /> : "Confirm Destruction"}
                </button>
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="w-full py-3.5 md:py-4 bg-gray-100 text-gray-500 text-[9px] md:text-[10px] font-black uppercase rounded-2xl md:rounded-[25px] hover:bg-gray-200 transition-all"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;