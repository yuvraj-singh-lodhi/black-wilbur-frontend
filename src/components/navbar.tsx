import React, { useState, useEffect } from "react";
import { MdMenu } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import logo from "../assets/navlogo.svg";
import Sidebar from "./sidebar";

const Navbar: React.FC = () => {
  const [sidebar, setSidebar] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  // Effect to hide navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setHideNavbar(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`navbar top-0 left-0 w-full flex items-center justify-between p-4 bg-transparent z-50 ${
          hideNavbar ? "hidden" : "static"
        }`}
      >
        {/* For Large Screens */}
        <div className="hidden md:flex items-center justify-between w-full pl-16 pr-10">
          <MdMenu className="text-2xl cursor-pointer" onClick={toggleSidebar} />
          <img src={logo} alt="BlackWilbur" className="h-8 mx-auto" />
          <div className="flex items-center space-x-4">
            <FaSearch className="text-xl" />
            <FaCircleUser className="text-xl" />
          </div>
        </div>

        {/* For Medium and Small Screens */}
        <div className="flex md:hidden items-center justify-between w-full pl-16 pr-14">
          <img src={logo} alt="BlackWilbur" className="h-8" />
          <div className="flex items-center space-x-4">
            <FaCircleUser className="text-xl" />
            <FaSearch className="text-xl" />
            <MdMenu
              className="text-2xl cursor-pointer pr-2"
              onClick={toggleSidebar}
            />
          </div>
        </div>
      </nav>

      {/* Sidebar component */}
      <Sidebar isOpen={sidebar} onClose={toggleSidebar} />
    </>
  );
};

export default Navbar;
