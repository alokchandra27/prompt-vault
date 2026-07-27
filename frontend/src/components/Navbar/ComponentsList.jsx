import React from 'react';
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Database, Users, Users2 } from "lucide-react";

const ComponentsList = () => {
  return (
    <div className="flex flex-col gap-5">
      <ul className="flex flex-col gap-5 pl-14 text-lg font-medium uppercase">
        <NavLink
          className="flex items-center gap-4 hover:bg-[#203A3E] p-2 rounded-md cursor-pointer transition"
          to="/"
        >
          <LayoutDashboard color="#fbf323"  size={20} /> 
          Dashboard
        </NavLink>

        <NavLink
          className="flex items-center gap-3 hover:bg-[#203A3E] p-2 rounded-md cursor-pointer transition"
          to="/myvault"
        >
          <Database color="#fbf323" size={20} />
          MyVault
        </NavLink>

        <NavLink
          className="flex items-center gap-3 hover:bg-[#203A3E] p-2 rounded-md cursor-pointer transition"
          to="/community"
        >
          <Users2 color="#fbf323" size={20} />
          Community
        </NavLink>
      </ul>
    </div>
  );
};

export default ComponentsList;