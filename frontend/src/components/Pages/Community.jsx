import { Sparkles, Search, Trash2, Edit3 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/AxiosConfig";

const Community = () => {
  const navigate = useNavigate();
  
  // Yahan aap apna state aur fetch logic khud likh lena (e.g., useState, useEffect)
  const [prompts, setPrompts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  // Filter logic (Aap chahein toh ise modify kar sakte hain)
  const filteredPrompts = prompts.filter((prompt) =>
    prompt.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  
  useEffect(()=>{
    try {
      const fetchCommunityPrompts = async () => {
        const response = await API.get("/api/prompts", { withCredentials: true });
        setPrompts(response.data.prompts);
        toast.success("Community prompts fetched successfully!");
      }
      fetchCommunityPrompts();

    }
      catch (error) {
        console.error("Error fetching community prompts:", error);
        toast.error("Failed to fetch community prompts.");
      }

    }, []);



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

      {/* Prompt List Cards */}
      <div className="flex flex-col gap-4">
        {filteredPrompts.length === 0 ? (
          <div className="text-center py-10 text-gray-400 font-semibold">No saved prompts found in your vault.</div>
        ) : (
          filteredPrompts.map((prompt) => (
            <div
              key={prompt._id}
              className="bg-white rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm hover:shadow-md transition gap-4"
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-gray-400">
                  {prompt.tags}
                </span>
                <h4 className="text-sm font-medium text-gray-500">
                  Category: {prompt.category}
                </h4>
                <h3 className="text-lg font-bold text-[#203A3E]">
                  {prompt.title}
                </h3>
              </div>

              {/* Action Buttons (Aap yahan apna onDelete / onUpdate logic lagana) */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate(`/prompt/${prompt._id}`)}
                  className="h-10 px-4 bg-gray-100 text-[#203A3E] rounded-xl text-sm font-bold hover:bg-gray-200 transition cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Community;