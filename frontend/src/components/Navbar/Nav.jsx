import React, { useState } from "react";
import LogoAndName from "./LogoAndName";
import ProfileNdName from "./ProfileNdName";
import ComponentsList from "./ComponentsList";
import { Menu, X } from "lucide-react"; // Icons ke liye

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 1. Mobile Top Bar / Hamburger Button (Sirf choti screens par dikhega) */}
      <div className="md:hidden flex items-center justify-between bg-[#203A3E] text-white p-4 w-full">
        <h1 className="font-bold text-lg">PromptVault</h1>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="focus:outline-none"
        >
          {isOpen ? <X size={28} color="#fbf323" /> : <Menu size={28} color="#fbf323" />}
        </button>
      </div>

      {/* 2. Main Navigation Sidebar */}
      <nav 
        className={`
          fixed md:static top-0 left-0 z-50
          flex flex-col gap-10 w-[20rem] h-screen bg-[#203A3E] rounded-r-4xl 
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <ProfileNdName />
        <ComponentsList />
        <LogoAndName />
      </nav>

      {/* 3. Backdrop Overlay (Jab mobile menu khula ho toh piche ki screen dark ho jaye) */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        ></div>
      )}
    </>
  );
};

export default Nav;