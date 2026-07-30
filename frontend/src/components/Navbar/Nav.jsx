import React, { useState } from "react";
import LogoAndName from "./LogoAndName";
import ProfileNdName from "./ProfileNdName";
import ComponentsList from "./ComponentsList";
import { Menu, X } from "lucide-react"; // Icons ke liye

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (

    <>
    {/* 1. Mobile Top Bar / Hamburger Button (Shows only on small screen) */}
    <div className={`md:hidden flex items-center justify-between bg-[#203A3E] text-white p-4 w-full ${isOpen ?"bg-white text-black" : "bg-[#203A3E] text-white"}`}>
      <h1 className="font-bold text-lg">PromptVault</h1>
      <button 
        onClick={() => setIsOpen(!isOpen)
        } 
        className="focus:outline-none"
        >
        {isOpen ? <X size={28} color="black" fontSize={20} />  : <Menu size={28} color="#fbf323" />}
        </button>
    </div>

        {/* Main navigation bar (jisme mere components ki list hai) */}
        <nav
        className={`fixed md:static w-[20rem] h-screen bg-[#203A3E] top-0 left-0 z-50 flex flex-col gap-10 rounded-r-4xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
          >
            <ProfileNdName />
            <ComponentsList />
            <LogoAndName /> 
             </nav>

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