// import axios from "axios";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import React, { useState } from "react";
import API from "../api/AxiosConfig"
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    console.log(data)
    // console.log(data);
    handleAuth(data)

  }

  const handleAuth = async (data) => {
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    try {
      const response = await API.post(endpoint, data, {
        withCredentials: true,
      });
      console.log(response.data);
      toast.success(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || "An error occurred");
    }
    
  }

  return (
    <div
      className=" text-black w-full h-full flex justify-center items-center p-4"
      style={{
        backgroundImage: "url('/photo-1513002749550-c59d786b8e6c.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Card Container: Fixed for desktop (80%/70%), Full for mobile */}
      <div className="h-auto md:h-[80%] w-full md:w-[70%] bg-white rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-2xl">
        {/* Left Side: Image (Mobile par upar, Desktop par side mein) */}
        <div className="w-full md:w-1/2 h-64 md:h-full bg-amber-50 p-2">
          <div className="bg-emerald-700 h-full rounded-2xl overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src="https://i.pinimg.com/736x/4d/7e/36/4d7e36285ead0faa242150a353418322.jpg"
              alt="Register Visual"
            />
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 h-auto md:h-full p-10 flex flex-col justify-center bg-white">

          {/*Heading and Description */}

          <h1 className="text-2xl font-bold text-[#1D2128]">
            {isLogin ? 'Welcome Back to PromptVault!' : 'Create Your Account'}
          </h1>

          <p className= "text-gray-500 mt-2 text-sm mb-6">
            {isLogin ? 'Enter your details to access your vault' : 'Start managing and sharing your prompts with ease'}
            </p>

          <form onSubmit={(e)=>{
            submitHandler(e)
          }
          }  className="flex flex-col gap-4">

          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Full Name</label>
              <div className="flex items-center gap-3 bg-[#F4F2F2] px-4 py-3 rounded-xl border border-gray-200 focus-within:border-[#203A3E] transition">
                <User size={18} className="text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Samuel Johnson" 
                  name="name"
                  className="bg-transparent border-none outline-none w-full text-sm text-[#1D2128]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Username</label>
            <div className="flex items-center gap-3 bg-[#F4F2F2] px-4 py-3 rounded-xl border border-gray-200 focus-within:border-[#203A3E] transition">
              <Mail size={18} className="text-gray-400" />
              <input 
                type="username"
                name="username" 
                placeholder="promptVault123" 
                className="bg-transparent border-none outline-none w-full text-sm text-[#1D2128]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Password</label>
            <div className="flex items-center gap-3 bg-[#F4F2F2] px-4 py-3 rounded-xl border border-gray-200 focus-within:border-[#203A3E] transition">
              <Lock size={18} className="text-gray-400" />
              <input 
                type="password" 
                name="password"
                placeholder="••••••••" 
                className="bg-transparent border-none outline-none w-full text-sm text-[#1D2128]"
              />
            </div>
          </div>

          <button className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 bg-[#203A3E] text-white rounded-xl font-medium hover:bg-[#284b50] transition shadow-md"
          type="submit">
          {isLogin ? 'Sign In' : 'Create an Account'}
          <ArrowRight size={18} />
          </button>

          {/* Toggle between Login and Register */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              {isLogin? "Don't have an account?" : "Already have an account?"}
              <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#203A3E] font-semibold ml-1 hover:underline"
              type="button"
              >
                {isLogin ? 'Register' : 'Login'}
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