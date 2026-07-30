import { Sparkles, Search, Bot, ArrowUpRight, FolderKanban, Wand2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/AxiosConfig";
import { toast } from "react-toastify";
import CreatePromptForm from "./CreatePromptForm";

const Dashboard = () => {
  const navigate = useNavigate();
  const [promptTitle, setPromptTitle] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);

  // AI Prompt Generation Handler (Mock or API)
  const handleGenerateAI = async () => {
    if (!promptTitle.trim()) {
      toast.warning("Please enter a topic or title first!");
      return;
    }
    setLoading(true);
    try {
      // Yahan apni AI backend API call laga sakte hain
      setTimeout(() => {
        setGeneratedContent(
          `Act as an expert prompt engineer. Generate a high-converting, detailed response for: "${promptTitle}". Include best practices, structured headings, and actionable outputs.`
        );
        setLoading(false);
        toast.success("AI Prompt generated successfully!");
      }, 1200);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to generate AI prompt.");
      console.error("AI Generation Error:", error);
    }
  };

  // Save generated prompt to backend
  const handleSavePrompt = async () => {
    if (!generatedContent) return;
    try {
      await API.post("/api/prompts", {
        title: promptTitle,
        content: generatedContent,
        category: "AI Generated",
        tags: "#ai #vault"
      }, { withCredentials: true });
      
      toast.success("Prompt saved to your Vault!");
      setPromptTitle("");
      setGeneratedContent("");
      navigate("/myvault"); // Save hone ke baad seedha vault me bhej dega
    } catch (error) {
      toast.error("Failed to save prompt.");
      console.error("Save Prompt Error:", error);
    }
  };

  return (
    <div className="h-full w-full bg-[#F4F7F6] p-6 md:p-8 flex flex-col gap-6 overflow-y-auto">
      
      {/* Top Search & Filter Bar (Reference Image Style) */}
      <div className="bg-white rounded-3xl p-4 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3 w-full md:w-96 bg-gray-100 rounded-2xl px-4 h-14">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search prompts, categories..."
            className="bg-transparent w-full text-sm font-medium outline-none"
          />
        </div>
        
        {/* Quick Navigation / Action Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={() => navigate('/myvault')}
            className="flex-1 md:flex-none h-14 px-6 bg-gray-100 text-[#203A3E] rounded-2xl text-sm font-bold shadow-sm hover:bg-gray-200 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <FolderKanban size={18} /> My Vault
          </button>
        </div>
      </div>

      {/* Main Grid Layout (Jaise reference image ka right section hai) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left/Main Column: AI Prompt Generator Workspace (2 Spans) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF9E20] bg-amber-50 px-3 py-1 rounded-full w-max">
              AI Workspace
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-[#203A3E]">
              Create & Generate AI Prompts
            </h1>
            <p className="text-sm text-gray-400">
              Type your topic below and let AI craft a professional, ready-to-use prompt instantly.
            </p>
          </div>

          {/* Input Box for AI Generation */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-600">Prompt Topic / Title</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. YouTube script writer for tech videos..."
                  value={promptTitle}
                  onChange={(e) => setPromptTitle(e.target.value)}
                  className="bg-gray-100 h-14 flex-1 rounded-2xl px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#FF9E20]"
                />
                <button
                  onClick={handleGenerateAI}
                  disabled={loading}
                  className="h-14 px-6 bg-[#FF9E20] text-white rounded-2xl font-bold flex items-center gap-2 shadow-md hover:bg-[#e88d15] transition cursor-pointer disabled:opacity-50"
                >
                  <Wand2 size={20} />
                  <span>{loading ? "Generating..." : "Generate"}</span>
                </button>
              </div>
            </div>

            {/* Generated Output Preview Box */}
            {generatedContent && (
              <div className="flex flex-col gap-2 animate-in fade-in duration-300">
                <label className="text-xs font-bold text-gray-600">Generated Result</label>
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm font-mono text-gray-700 min-h-[120px] max-h-[200px] overflow-y-auto whitespace-pre-wrap">
                  {generatedContent}
                </div>
                <button
                  onClick={handleSavePrompt}
                  className="h-12 bg-[#203A3E] text-white rounded-xl font-bold text-sm shadow hover:bg-black transition cursor-pointer self-end px-6 mt-1"
                >
                  Save to Vault 🚀
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Quick Stats / Card Preview (Reference Image Style Sidebar Card) */}
        <div className="bg-[#203A3E] text-white rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between gap-6 relative overflow-hidden">
          {/* Background decorative circles */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full pointer-events-none" />

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full text-[#FF9E20]">
                Vault Status
              </span>
              <Bot size={24} className="text-[#FF9E20]" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Your AI Command Center</h3>
              <p className="text-xs text-gray-300 mt-1">
                Manage your saved templates and community prompts seamlessly from one place.
              </p>
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-gray-300">Quick Navigation</span>
              <span className="text-sm font-bold text-white">Explore Community</span>
            </div>
            <button 
              onClick={() => navigate('/community')}
              className="h-10 w-10 bg-[#FF9E20] rounded-xl flex items-center justify-center text-white hover:bg-[#e88d15] transition cursor-pointer"
            >
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>

      </div>

      <CreatePromptForm/>

    </div>
  );
};

export default Dashboard;