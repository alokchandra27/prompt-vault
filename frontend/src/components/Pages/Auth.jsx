import { ArrowRight, Lock, Mail, User } from "lucide-react";
import React, { useState } from "react";
import API from "../api/AxiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (!data.username || !data.password) {
      toast.info("Please fill in your username and password");
      return;
    }

    if (!isLogin && !data.name) {
      toast.info("Your name helps personalize your experience 🙂");
      return;
    }

    handleAuth(data, e);
  };

  const handleAuth = async (data, e) => {
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";

    try {
      setLoading(true);

      const toastId = toast.loading(
        isLogin ? "Signing you in..." : "Creating your account..."
      );

      const response = await API.post(endpoint, data, {
        withCredentials: true,
      });

  
      toast.update(toastId, {
        render: isLogin
          ? `Welcome back, ${response?.data?.user?.name || "User"} 👋`
          : "Account created successfully 🎉",
        type: "success",
        isLoading: false,
        autoClose: 2500,
      });

      e.target.reset();
      navigate("/");
    } catch (error) {
      toast.dismiss();

      const message =
        error?.response?.data?.message === "Invalid credentials"
          ? "That doesn’t look right. Try again."
          : error?.response?.data?.message ||
            "Something went wrong. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="text-black w-full h-full flex justify-center items-center p-4"
      style={{
        backgroundImage:
          "url('/photo-1513002749550-c59d786b8e6c.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="h-auto md:h-[80%] w-full md:w-[70%] bg-white rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-2xl">
        
        {/* Left Image */}
        <div className="w-full md:w-1/2 h-64 md:h-full bg-amber-50 p-2">
          <div className="bg-emerald-700 h-full rounded-2xl overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src="https://i.pinimg.com/1200x/6e/6f/ab/6e6fabb9dc098efb68ad1d01846d5f59.jpg"
              alt="Auth Visual"
            />
          </div>
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center bg-white">

          <h1 className="text-2xl font-bold text-[#1D2128]">
            {isLogin ? "Welcome Back to PromptVault!" : "Create Your Account"}
          </h1>

          <p className="text-gray-500 mt-2 text-sm mb-6">
            {isLogin
              ? "Enter your details to access your vault"
              : "Start managing and sharing your prompts with ease"}
          </p>

          <form onSubmit={submitHandler} className="flex flex-col gap-4">

            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">
                  Full Name
                </label>
                <div className="flex items-center gap-3 bg-[#F4F2F2] px-4 py-3 rounded-xl border border-gray-200">
                  <User size={18} className="text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Samuel Johnson"
                    autoComplete="name"
                    className="bg-transparent outline-none w-full text-sm"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">
                Username
              </label>
              <div className="flex items-center gap-3 bg-[#F4F2F2] px-4 py-3 rounded-xl border border-gray-200">
                <Mail size={18} className="text-gray-400" />
                <input
                  type="text"
                  name="username"
                  required
                  placeholder="promptVault123"
                  autoComplete="username"
                  className="bg-transparent outline-none w-full text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">
                Password
              </label>
              <div className="flex items-center gap-3 bg-[#F4F2F2] px-4 py-3 rounded-xl border border-gray-200">
                <Lock size={18} className="text-gray-400" />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="bg-transparent outline-none w-full text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 bg-[#203A3E] text-white rounded-xl font-medium hover:bg-[#284b50] transition shadow-md disabled:opacity-70"
            >
              {loading
                ? isLogin
                  ? "Signing in..."
                  : "Creating account..."
                : isLogin
                ? "Sign In"
                : "Create an Account"}
              <ArrowRight size={18} />
            </button>

            {/* Toggle */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    toast.dismiss(); // ✅ prevent clutter
                  }}
                  type="button"
                  className="text-[#203A3E] font-semibold ml-1 hover:underline"
                >
                  {isLogin ? "Register" : "Login"}
                </button>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;