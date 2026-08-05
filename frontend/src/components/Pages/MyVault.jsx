import { Sparkles, Search, ArrowUpRight, FolderKanban, FileCode, FileText, Download } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/AxiosConfig";
import { handlePromptExport } from "./handelPromptExport"; // Helper import

const MyVault = () => {
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPrompts = prompts.filter((prompt) =>
    prompt.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchMyPrompts = async () => {
      try {
        const response = await API.get("/api/prompts/me", { withCredentials: true });
        setPrompts(response.data.prompts);
      } catch (error) {
        console.error("Error fetching my prompts:", error);
        if (error.response && error.response.status === 401) {
          toast.error("You are not authorized. Please log in.");
          navigate("/auth");
        }
      }
    };
    fetchMyPrompts();
  }, [navigate]);

  return (
    <div className="h-full w-full bg-[#F4F7F6] p-6 md:p-8 flex flex-col gap-6 overflow-y-auto">
      
      {/* Top Search Bar */}
      <div className="bg-white rounded-3xl p-4 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3 w-full md:w-80 bg-gray-100 rounded-2xl px-4 h-12">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search your saved vaults..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent w-full text-sm font-medium outline-none"
          />
        </div>

        <button 
          onClick={() => navigate('/')}
          className="h-12 w-full md:w-auto px-6 bg-[#FF9E20] text-white flex justify-center items-center text-sm font-bold gap-2 rounded-2xl shadow-md hover:bg-[#e88d15] transition cursor-pointer"
        >
          <Sparkles size={18} />
          <span>Go to Dashboard</span>
        </button>
      </div>

      {/* Header & Results Count */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#203A3E] uppercase tracking-wide">
          My Saved Vault ({filteredPrompts.length})
        </h2>
      </div>

      {/* Grid Card Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPrompts.length === 0 ? (
          <div className="col-span-full text-center py-10 text-gray-400 font-semibold">
            No saved prompts found in your vault.
          </div>
        ) : (
          filteredPrompts.map((prompt) => {
            // Tags handle karne ka secure logic (chahe array ho ya string)
            const tagsList = Array.isArray(prompt.tags) 
              ? prompt.tags 
              : (typeof prompt.tags === "string" ? prompt.tags.match(/#[\w-]+/g) || prompt.tags.split(",") : []);

            return (
              <div
                key={prompt._id}
                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-6 border border-gray-100 group"
              >
                {/* Card Top: Category & Icon */}
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider bg-amber-50 text-[#FF9E20] px-3 py-1 rounded-full">
                    {prompt.category || "General"}
                  </span>
                  <div 
                    onClick={() => navigate(`/prompt/${prompt._id}`)}
                    className="h-9 w-9 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-[#FF9E20] group-hover:text-white transition-all cursor-pointer"
                  >
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                {/* Card Body: Title & Wrapped Tags */}
                <div className="flex flex-col gap-2">
                  <h3 
                    onClick={() => navigate(`/prompt/${prompt._id}`)}
                    className="text-lg font-bold text-[#203A3E] line-clamp-2 group-hover:text-[#FF9E20] transition-colors cursor-pointer"
                  >
                    {prompt.title}
                  </h3>

                  {/* Wrapped Tags Container */}
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {tagsList.map((tag, idx) => {
                      const cleanTag = typeof tag === "string" ? tag.trim() : "";
                      if (!cleanTag) return null;
                      const formattedTag = cleanTag.startsWith("#") ? cleanTag : `#${cleanTag}`;
                      return (
                        <span 
                          key={idx} 
                          className="text-xs font-medium bg-gray-100 text-gray-400 px-2 py-0.5 rounded-md"
                        >
                          {formattedTag}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Card Bottom: Export Buttons & Footer info */}
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePromptExport(prompt._id, "json", false, prompt.title)}
                      className="p-2 bg-gray-100 hover:bg-gray-200 text-[#203A3E] rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                      title="Export JSON"
                    >
                      <FileCode size={14} /> JSON
                    </button>
                    <button
                      onClick={() => handlePromptExport(prompt._id, "md", false, prompt.title)}
                      className="p-2 bg-gray-100 hover:bg-gray-200 text-[#203A3E] rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                      title="Export Markdown"
                    >
                      <FileText size={14} /> MD
                    </button>
                    <button
                      onClick={() => handlePromptExport(prompt._id, "pdf", false, prompt.title)}
                      className="p-2 bg-[#FF9E20] hover:bg-[#e88d15] text-white rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-sm"
                      title="Export PDF"
                    >
                      <Download size={14} /> PDF
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
                    <span 
                      onClick={() => navigate(`/prompt/${prompt._id}`)} 
                      className="cursor-pointer hover:underline"
                    >
                      View Prompt
                    </span>
                    <span className="text-[#203A3E] font-bold">ID: {prompt._id.slice(-6)}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

export default MyVault;