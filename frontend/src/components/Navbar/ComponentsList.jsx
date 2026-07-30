import React from 'react';
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Database, Users2, Settings } from "lucide-react";

const ComponentsList = () => {
  return (
    <div className="flex flex-col gap-5">
      <ul className="flex flex-col gap-5 pl-14 text-lg font-medium uppercase">
        
        <NavLink
          to="/"
          className={({ isActive }) => 
            `flex items-center w-full gap-4 py-2 px-3 rounded-l-full cursor-pointer transition ${
              isActive ? "bg-[#e5ebeb] text-black " : "hover:bg-[#203A3E] text-white"
            }`
          }
        >
          <LayoutDashboard color="#fbf323" size={20} /> 
          Dashboard
        </NavLink>

        <NavLink
          to="/myvault"
          className={({ isActive }) => 
            `flex items-center gap-3 py-2 px-3 rounded-l-full  cursor-pointer transition-all ${
               isActive ? "bg-[#e5ebeb] text-black" : "hover:bg-[#203A3E] text-white"
            }`
          }
        >
          <Database color="#fbf323" size={20} />
          MyVault
        </NavLink>

        <NavLink
          to="/community"
          className={({ isActive }) => 
            `flex items-center gap-3 py-2 px-3 rounded-l-full  cursor-pointer transition ${
               isActive ? "bg-[#e5ebeb] text-black" : "hover:bg-[#203A3E] text-white"
            }`
          }
        >
          <Users2 color="#fbf323" size={20} />
          Community
        </NavLink>

        <NavLink
          to="/auth"
          className={({ isActive }) => 
            `flex items-center gap-3 py-2 px-3 rounded-l-full  cursor-pointer transition ${
               isActive ? "bg-[#e5ebeb] text-black" : "hover:bg-[#203A3E] text-white"
            }`
          }
        >
          <Settings color="#fbf323" size={20} />
          Login / Register
        </NavLink>

      </ul>
    </div>
  );
};

export default ComponentsList;