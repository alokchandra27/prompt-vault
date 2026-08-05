import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Shield,
  Calendar,
  LogOut,
  Edit3,
  Sparkles,
  Check,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/AxiosConfig";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const [updating, setUpdating] = useState(false);


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await API.get("/api/auth/me", {
          withCredentials: true,
        });
        const userData = response.data.user || response.data;
        setUser(userData);
        setNewName(userData?.name || "");
      } catch (error) {
        console.error("Error fetching profile:", error);
        if (error.response && error.response.status === 401) {
          toast.error("You are not authorized. Please log in.");
          navigate("/auth");
        } else {
          toast.error("Failed to load profile details.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [navigate]);

  // Handle Update Name API Call
  const handleUpdateName = async () => {
    if (!newName.trim()) {
      toast.warning("Name cannot be empty!");
      return;
    }

    if (newName.trim() === user?.name) {
      setIsEditingName(false);
      return;
    }

    setUpdating(true);
    try {
      const response = await API.patch(
        "/api/auth/update-name",
        { name: newName },
        { withCredentials: true },
      );

      const updatedUser = response.data.user || response.data;
      setUser((prev) => ({ ...prev, name: updatedUser.name || newName }));

      toast.success("Name updated successfully!");
      setIsEditingName(false);
    } catch (error) {
      console.error("Update name error:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in.");
        navigate("/auth");
      } else {
        toast.error(error.response?.data?.error || "Failed to update name.");
      }
    } finally {
      setUpdating(false);
    }
  };

  // 2. Logout using POST /api/auth/logout (with authMiddleware)
  const handleLogout = async () => {
    try {
      await API.post("/api/auth/logout", {}, { withCredentials: true });
      toast.success("Logged out successfully!");
      navigate("/auth");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out.");
    }
  };

  if (loading) {
    return (
      <div className="h-full w-full bg-[#F4F7F6] flex items-center justify-center">
        <p className="text-gray-400 font-semibold animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-[#F4F7F6] p-6 md:p-8 flex flex-col gap-6 overflow-y-auto">
      {/* Top Header Section */}
      <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-amber-50 rounded-full flex items-center justify-center text-[#FF9E20] text-2xl font-bold shadow-inner">
            {user?.name ? (
              user.name.charAt(0).toUpperCase()
            ) : (
              <User size={28} />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#203A3E]">
              {user?.name || "User Profile"}
            </h2>
            <p className="text-xs text-gray-400 font-medium mt-0.5">
              Manage your account information and preferences
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="h-12 w-full md:w-auto px-6 bg-[#FF9E20] text-white flex justify-center items-center text-sm font-bold gap-2 rounded-2xl shadow-md hover:bg-[#e88d15] transition cursor-pointer"
        >
          <Sparkles size={18} />
          <span>Go to Dashboard</span>
        </button>
      </div>

      {/* Profile Details & Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Card: Account Info */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between gap-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <h3 className="text-lg font-bold text-[#203A3E]">
              Personal Information
            </h3>
            <span className="text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">
              Active Account
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {/* Name Field with Inline Editing */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-4 flex-1">
                <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-gray-400 shadow-sm shrink-0">
                  <User size={18} />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-gray-400 font-medium block">
                    Full Name
                  </span>
                  {isEditingName ? (
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      disabled={updating}
                      className="mt-1 bg-white border border-gray-300 rounded-xl px-3 py-1 text-sm font-bold text-[#203A3E] outline-none focus:ring-2 focus:ring-[#FF9E20] w-full max-w-xs"
                      autoFocus
                    />
                  ) : (
                    <span className="text-sm font-bold text-[#203A3E]">
                      {user?.name || "N/A"}
                    </span>
                  )}
                </div>
              </div>

              {/* Edit / Save / Cancel Buttons */}
              <div className="flex items-center gap-2">
                {isEditingName ? (
                  <>
                    <button
                      onClick={handleUpdateName}
                      disabled={updating}
                      className="h-9 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      <Check size={14} /> {updating ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingName(false);
                        setNewName(user?.name || "");
                      }}
                      disabled={updating}
                      className="h-9 px-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <X size={14} /> Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="h-9 px-3 bg-amber-50 hover:bg-amber-100 text-[#FF9E20] rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 size={14} /> Edit
                  </button>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-gray-400 shadow-sm shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <span className="text-xs text-gray-400 font-medium block">
                  Email Address
                </span>
                <span className="text-sm font-bold text-[#203A3E]">
                  {user?.email || "N/A"}
                </span>
              </div>
            </div>

            {/* Joined Date Field */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-gray-400 shadow-sm shrink-0">
                <Calendar size={18} />
              </div>
              <div>
                <span className="text-xs text-gray-400 font-medium block">
                  Member Since
                </span>
                <span className="text-sm font-bold text-[#203A3E]">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "Recent"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Quick Actions / Logout */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between gap-6">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-lg font-bold text-[#203A3E]">
              Account Actions
            </h3>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate("/myvault")}
              className="w-full h-12 bg-gray-50 hover:bg-gray-100 text-[#203A3E] rounded-2xl text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View My Vault</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full h-12 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100/50">
            <p className="text-xs text-[#203A3E] font-medium leading-relaxed">
              💡 <span className="font-bold">Tip:</span> Your All Prompts Are
              Secure In My Vault
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
