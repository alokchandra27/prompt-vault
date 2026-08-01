import { Sparkles, Bot, ArrowUpRight, FolderKanban, Wand2, Zap } from "lucide-react";
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
  const [saving, setSaving] = useState(false);
  const [improving, setImproving] = useState(false);

  // States for standalone Quick Improve Box
  const [customInput, setCustomInput] = useState("");
  const [improvedCustomContent, setImprovedCustomContent] = useState("");
  const [customImproving, setCustomImproving] = useState(false);

  // 1. AI Prompt Generation Handler (Connected with Real Backend API)
  const handleGenerateAI = async () => {
    if (!promptTitle.trim()) {
      toast.warning("Please enter a topic or title first!");
      return;
    }
    setLoading(true);
    try {
      const response = await API.post("/api/ai/generate", { 
        userInput: promptTitle,
        isPublic: false 
      }, { 
        withCredentials: true 
      });

      const fullPrompt = response.data.prompt?.content || response.data.generated || promptTitle;
      setGeneratedContent(fullPrompt);
      setLoading(false);
      toast.success("AI Prompt generated successfully!");
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        toast.error("You are not authorized. Please log in.");
        navigate("/auth");
        return;
      }
      toast.error(error.response?.data?.error || "Failed to generate AI prompt.");
    }
  };

  // 2. Save generated prompt to backend
  const handleSavePrompt = async () => {
    if (!generatedContent || saving) return;
    setSaving(true);
    try {
      await API.post("/api/prompts", {
        title: promptTitle,
        content: generatedContent,
        category: "Other",
        isPublic: false
      }, { withCredentials: true });
      
      toast.success("Prompt saved to your Vault!");
      setPromptTitle("");
      setGeneratedContent("");
      navigate("/myvault"); 
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Session expired. Please log in.");
        navigate("/auth");
        return;
      }
      toast.error("Failed to save prompt.");
    } finally {
      setSaving(false);
    }
  };

  // 3. Improve Generated Prompt using Backend API (/api/ai/improve)
  const handleImprovePrompt = async () => {
    if (!generatedContent || improving) return;
    setImproving(true);
    try {
      toast.info("Improving prompt with AI...");
      
      const response = await API.post("/api/ai/improve", { 
        content: generatedContent 
      }, { 
        withCredentials: true 
      });

      setGeneratedContent(response.data.improved);
      toast.success("Prompt improved successfully!");
    } catch (error) {
      console.error("Improve error:", error);
      if (error.response && error.response.status === 401) {
        toast.error("You are not authorized. Please log in.");
        navigate("/auth");
        return;
      }
      toast.error("Failed to improve prompt.");
    } finally {
      setImproving(false);
    }
  };

  // 4. Quick Improve for Custom User Input (Standalone Improve API)
  const handleCustomImprove = async () => {
    if (!customInput.trim() || customImproving) {
      toast.warning("Please enter some text to improve!");
      return;
    }
    setCustomImproving(true);
    try {
      toast.info("Improving your custom prompt...");
      
      const response = await API.post("/api/ai/improve", { 
        content: customInput 
      }, { 
        withCredentials: true 
      });

      setImprovedCustomContent(response.data.improved);
      toast.success("Custom prompt improved successfully!");
    } catch (error) {
      console.error("Custom improve error:", error);
      if (error.response && error.response.status === 401) {
        toast.error("You are not authorized. Please log in.");
        navigate("/auth");
        return;
      }
      toast.error("Failed to improve custom prompt.");
    } finally {
      setCustomImproving(false);
    }
  };

  return (
    <div className="h-full w-full bg-[#F4F7F6] p-4 md:p-6 flex flex-col justify-between gap-4 overflow-y-auto">
      
      {/* Top Section: AI Workspace & Sidebar Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Left/Main Column: AI Prompt Generator Workspace */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-5 md:p-6 shadow-sm flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF9E20] bg-amber-50 px-3 py-0.5 rounded-full w-max">
              AI Workspace
            </span>
            <h1 className="text-xl md:text-2xl font-bold text-[#203A3E]">
              Create & Generate AI Prompts
            </h1>
            <p className="text-xs text-gray-400">
              Type your topic below and let AI craft a professional, ready-to-use prompt instantly.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-600">Prompt Topic / Title</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. YouTube script writer for tech videos..."
                  value={promptTitle}
                  onChange={(e) => setPromptTitle(e.target.value)}
                  disabled={loading || saving}
                  className="bg-gray-100 h-12 flex-1 rounded-2xl px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#FF9E20] disabled:opacity-50"
                />
                <button
                  onClick={handleGenerateAI}
                  disabled={loading || saving}
                  className="h-12 px-5 bg-[#FF9E20] text-white rounded-2xl font-bold text-sm flex items-center gap-2 shadow-md hover:bg-[#e88d15] transition cursor-pointer disabled:opacity-50"
                >
                  <Wand2 size={18} />
                  <span>{loading ? "Generating..." : "Generate"}</span>
                </button>
              </div>
            </div>

            {generatedContent && (
              <div className="flex flex-col gap-1 animate-in fade-in duration-300">
                <label className="text-[11px] font-bold text-gray-600">Generated Result</label>
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3 text-xs font-mono text-gray-700 max-h-[120px] overflow-y-auto whitespace-pre-wrap">
                  {generatedContent}
                </div>
                
                {/* Action Buttons: Improve with AI & Save to Vault */}
                <div className="flex justify-between items-center mt-2">
                  <button
                    onClick={handleImprovePrompt}
                    disabled={improving}
                    className="h-10 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-xl font-bold text-xs transition cursor-pointer px-4 flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <Sparkles size={14} />
                    <span>{improving ? "Improving..." : "Improve with AI ✨"}</span>
                  </button>

                  <button
                    onClick={handleSavePrompt}
                    disabled={saving}
                    className="h-10 bg-[#203A3E] text-white rounded-xl font-bold text-xs shadow hover:bg-black transition cursor-pointer px-5 disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <span>{saving ? "Saving to Vault..." : "Save to Vault 🚀"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Vault Status Sidebar */}
        <div className="bg-[#203A3E] text-white rounded-3xl p-5 md:p-6 shadow-sm flex flex-col justify-between gap-4 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />

          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 px-3 py-0.5 rounded-full text-[#FF9E20]">
                Vault Status
              </span>
              <Bot size={20} className="text-[#FF9E20]" />
            </div>
            <div>
              <h3 className="text-lg font-bold">AI Command Center</h3>
              <p className="text-xs text-gray-300 mt-0.5">
                Manage your saved templates and community prompts seamlessly.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/myvault')}
              className="flex-1 h-11 bg-white/10 text-white rounded-xl text-xs font-bold hover:bg-white/20 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <FolderKanban size={16} /> My Vault
            </button>
            <button 
              onClick={() => navigate('/community')}
              className="h-11 w-11 bg-[#FF9E20] rounded-xl flex items-center justify-center text-white hover:bg-[#e88d15] transition cursor-pointer"
            >
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>

      </div>

      {/* Quick AI Improver Section (Standalone Improve Feature) */}
      <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-0.5 rounded-full w-max flex items-center gap-1">
            <Zap size={12} /> Quick Improver
          </span>
          <h2 className="text-lg font-bold text-[#203A3E]">Enhance Any Existing Prompt</h2>
          <p className="text-xs text-gray-400">
            Paste your raw or rough prompt below and let the AI polish it into a high-performance prompt.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <textarea
            rows="3"
            placeholder="Paste your rough prompt text here..."
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            disabled={customImproving}
            className="w-full bg-gray-100 rounded-2xl p-3 text-xs font-medium outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 resize-y"
          />

          <button
            onClick={handleCustomImprove}
            disabled={customImproving}
            className="h-11 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs transition cursor-pointer self-start px-5 flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            <Sparkles size={16} />
            <span>{customImproving ? "Polishing Prompt..." : "Improve This Prompt ✨"}</span>
          </button>

          {improvedCustomContent && (
            <div className="flex flex-col gap-1 mt-2 animate-in fade-in duration-300">
              <label className="text-[11px] font-bold text-gray-600">Improved Output</label>
              <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-3 text-xs font-mono text-gray-700 max-h-[120px] overflow-y-auto whitespace-pre-wrap">
                {improvedCustomContent}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section: Create Prompt Form */}
      <div className="w-full">
        <CreatePromptForm />
      </div>

    </div>
  );
};

export default Dashboard;