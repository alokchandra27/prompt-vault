import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/AxiosConfig';
import { Trash2, Edit3, ArrowLeft, Copy, Check, X } from 'lucide-react';
import { toast } from 'react-toastify';

const PromptDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [promptData, setPromptData] = useState(null);
  const [copied, setCopied] = useState(false);
  
  // Modal aur form states
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', tags: '' });

  useEffect(() => {
    const fetchPromptDetails = async () => {
      try {
        // Pehle protected vault route try karein
        const response = await API.get(`/api/prompts/${id}`, { withCredentials: true });
        const fetchedPrompt = response.data.prompt;
        setPromptData(fetchedPrompt);
        
        setFormData({
          title: fetchedPrompt.title || '',
          content: fetchedPrompt.content || fetchedPrompt.description || '',
          tags: fetchedPrompt.tags || ''
        });

        toast.success("Prompt details fetched successfully!");
      } catch (error) {
        console.error("Error fetching prompt details:", error);
        
        // Agar 401 aaye, toh ho sakta hai yeh community prompt ho (non-auth)
        if (error.response && error.response.status === 401) {
          try {
            // Community public endpoint try karein (Aap apne backend ke hisaab se URL change kar sakte hain, e.g., /api/community or /api/prompts/public)
            const publicResponse = await API.get(`/api/prompts/public/${id}`);
            const fetchedPrompt = publicResponse.data.prompt || publicResponse.data;
            setPromptData(fetchedPrompt);
            
            setFormData({
              title: fetchedPrompt.title || '',
              content: fetchedPrompt.content || fetchedPrompt.description || '',
              tags: fetchedPrompt.tags || ''
            });
            return;
          } catch (publicError) {
            console.error("Public fetch error:", publicError);
          }
        }

        toast.error("Failed to fetch prompt details.");
      }
    };

    fetchPromptDetails();
  }, [id]);

  // Input fields change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update Submit Handler
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.patch(`/api/prompts/${id}`, formData, { withCredentials: true });
      setPromptData(response.data.prompt || formData);
      setIsEditing(false);
      toast.success("Prompt updated successfully!");
    } catch (error) {
      console.error("Error updating prompt:", error);
      if (error.response && error.response.status === 401) {
        toast.error("You must be logged in to update prompts.");
        navigate("/auth");
        return;
      }
      toast.error("Failed to update prompt.");
    }
  };

  // Copy to clipboard function
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.info("Prompt copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Delete Handler
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this prompt?")) {
      try {
        await API.delete(`/api/prompts/${id}`, { withCredentials: true });
        toast.success("Prompt deleted successfully!");
        navigate('/'); 
      } catch (error) {
        console.error("Error deleting prompt:", error);
        if (error.response && error.response.status === 401) {
          toast.error("You must be logged in to delete prompts.");
          navigate("/auth");
          return;
        }
        toast.error("Failed to delete prompt.");
      }
    }
  };

  if (!promptData) {
    return (
      <div className="h-screen w-full flex justify-center items-center bg-[#F4F7F6] text-[#203A3E] text-xl font-bold">
        Loading prompt details...
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-[#F4F7F6] p-6 md:p-10 flex flex-col gap-6 overflow-y-auto relative">
      
      {/* Top Navigation / Back Button */}
      <div className="flex justify-between items-center">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold text-[#203A3E] bg-white px-4 py-2 rounded-xl shadow-sm hover:bg-gray-100 transition cursor-pointer"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* Edit & Delete Action Buttons */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow hover:bg-blue-700 transition cursor-pointer"
          >
            <Edit3 size={18} /> Update
          </button>

          <button 
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow hover:bg-red-700 transition cursor-pointer"
          >
            <Trash2 size={18} /> Delete
          </button>
        </div>
      </div>

      <div className="edit-block bg-amber-50 p-4 rounded-xl shadow-sm text-sm text-gray-600 border border-amber-200">
        <p><strong>Note:</strong> You can edit or delete this prompt using the buttons above. Make sure to save your changes!</p>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
        
        {/* Title & Tags */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-gray-400">
            {promptData.tags || "#coding #ai #prompt"}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-[#203A3E]">
            {promptData.title || "Untitled Prompt"}
          </h1>
        </div>

        {/* Prompt Content Box */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-gray-600 uppercase tracking-wide">
              Prompt Content
            </label>
            <button 
              onClick={() => handleCopy(promptData.content || promptData.description)}
              className="flex items-center gap-1.5 text-xs font-bold text-[#FF9E20] bg-amber-50 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition cursor-pointer"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied!" : "Copy Prompt"}
            </button>
          </div>
          <div className="bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-700 font-mono text-sm min-h-[150px] whitespace-pre-wrap">
            {promptData.content || promptData.description || "No prompt content available."}
          </div>
        </div>

        {/* Extra Details / Meta */}
        <div className="flex justify-between items-center text-xs text-gray-400 border-t pt-4">
          <span>Created on: {promptData.createdAt ? new Date(promptData.createdAt).toLocaleDateString() : "No Date"}</span>
          <span className="bg-[#FF9E20]/10 text-[#FF9E20] px-3 py-1 rounded-full font-bold">
            Prompt ID: {id}
          </span>
        </div>

      </div>

      {/* ==================== EDIT POPUP MODAL ==================== */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col gap-5 relative">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#203A3E]">Update Prompt</h2>
              <button 
                onClick={() => setIsEditing(false)} 
                className="text-gray-400 hover:text-black cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            {/* Edit Form */}
            <form onSubmit={handleUpdateSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-600">Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange}
                  className="bg-gray-100 h-12 rounded-xl px-4 text-sm outline-none focus:ring-2 focus:ring-[#FF9E20]"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-600">Tags</label>
                <input 
                  type="text" 
                  name="tags" 
                  value={formData.tags} 
                  onChange={handleChange}
                  className="bg-gray-100 h-12 rounded-xl px-4 text-sm outline-none focus:ring-2 focus:ring-[#FF9E20]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-600">Prompt Content</label>
                <textarea 
                  name="content" 
                  value={formData.content} 
                  onChange={handleChange}
                  rows={5}
                  className="bg-gray-100 rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-[#FF9E20] resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="h-12 bg-[#FF9E20] text-white rounded-xl font-bold shadow-md hover:bg-[#e88d15] transition cursor-pointer mt-2"
              >
                Save Changes
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default PromptDetail;