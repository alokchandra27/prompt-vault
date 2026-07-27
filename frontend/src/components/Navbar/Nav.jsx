import React from "react";
import LogoAndName from "./LogoAndName";
import ProfileNdName from "./ProfileNdName";
import ComponentsList from "./ComponentsList";

const Nav = () => {
  return (
    <nav className="flex flex-col gap-10 w-[30%] h-screen bg-[#203A3E] border-r-2 border-gray-700 rounded-r-3xl">

    <ProfileNdName/>
    <ComponentsList/>
      <LogoAndName />
      

     
    </nav>
  );
};

export default Nav;
