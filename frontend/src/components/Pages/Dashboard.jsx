import React from 'react';
import { Search, Filter, Plus, Sparkles, Copy, ArrowUpRight } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex-1 p-6 md:p-8 bg-[#F4F2F2] text-[#1D2128] min-h-screen overflow-y-auto ">
      
      {/* Top Search & Actions Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 w-full md:w-1/2 bg-[#F4F2F2] px-4 py-2.5 rounded-xl border border-gray-200">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search prompts by title, tag, or keyword..." 
            className="bg-transparent border-none outline-none w-full text-sm text-[#1D2128]"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition">
            <Filter size={16} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#203A3E] text-white text-sm font-medium hover:bg-[#284b50] transition shadow-md">
            <Plus size={16} />
            New Prompt
          </button>
        </div>
      </div>

      {/* Stats / Quick Overview Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Vault Prompts</p>
            <h3 className="text-2xl font-bold mt-1 text-[#203A3E]">24</h3>
          </div>
          <div className="p-3 bg-[#203A3E]/10 rounded-xl text-[#203A3E]">
            <Sparkles size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Community Shares</p>
            <h3 className="text-2xl font-bold mt-1 text-[#203A3E]">12</h3>
          </div>
          <div className="p-3 bg-amber-500/10 rounded-xl text-amber-600">
            <ArrowUpRight size={22} />
          </div>
        </div>

        <div className="bg-[#203A3E] text-white p-5 rounded-2xl shadow-md flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-200 font-medium">Gemini AI Engine</p>
            <h3 className="text-lg font-bold mt-1">Active & Ready</h3>
          </div>
          <div className="p-3 bg-white/10 rounded-xl text-white">
            <Sparkles size={22} />
          </div>
        </div>
      </div>

      {/* Recent Prompts Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-[#1D2128]">Recent Prompts</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs bg-[#203A3E]/10 text-[#203A3E] px-3 py-1 rounded-full font-semibold">#writing</span>
                <span className="text-xs text-gray-400">2h ago</span>
              </div>
              <h3 className="text-base font-bold text-[#1D2128] mb-2">SEO Blog Post Wizard</h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">Generate engaging SEO-optimized blog post outlines instantly with custom tone...</p>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
              <span className="text-gray-400 font-medium">Usage: 45</span>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition" title="Copy Prompt">
                  <Copy size={16} />
                </button>
                <button className="px-3 py-1.5 bg-[#203A3E] text-white rounded-lg font-medium hover:bg-[#284b50] transition">
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs bg-[#203A3E]/10 text-[#203A3E] px-3 py-1 rounded-full font-semibold">#coding</span>
                <span className="text-xs text-gray-400">5h ago</span>
              </div>
              <h3 className="text-base font-bold text-[#1D2128] mb-2">Python Code Explainer</h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">Explain complex Python code snippets, algorithms, and logic in simple beginner terms...</p>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
              <span className="text-gray-400 font-medium">Usage: 112</span>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition" title="Copy Prompt">
                  <Copy size={16} />
                </button>
                <button className="px-3 py-1.5 bg-[#203A3E] text-white rounded-lg font-medium hover:bg-[#284b50] transition">
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs bg-[#203A3E]/10 text-[#203A3E] px-3 py-1 rounded-full font-semibold">#marketing</span>
                <span className="text-xs text-gray-400">1d ago</span>
              </div>
              <h3 className="text-base font-bold text-[#1D2128] mb-2">Viral Instagram Caption</h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">Create catchy and engaging captions for Instagram posts with proper hashtag bundles...</p>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
              <span className="text-gray-400 font-medium">Usage: 88</span>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition" title="Copy Prompt">
                  <Copy size={16} />
                </button>
                <button className="px-3 py-1.5 bg-[#203A3E] text-white rounded-lg font-medium hover:bg-[#284b50] transition">
                  Export
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;