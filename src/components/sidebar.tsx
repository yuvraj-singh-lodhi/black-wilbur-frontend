import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { MdClose, MdFacebook } from "react-icons/md";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate(); // Initialize the useNavigate hook inside the component

  const handleNavigate = (path: string) => {
    navigate(path); // Programmatically navigate to the given path
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#141414] text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex items-center justify-start p-4">
          <MdClose className="text-2xl cursor-pointer" onClick={onClose} />
        </div>
        <div className="flex flex-col items-start justify-center gap-6 pt-20 pl-12 pb-8 font-light tracking-wide ">
          <a onClick={() => handleNavigate("/Login")} className="text-2xl cursor-pointer">
            LOGIN
          </a>
          <a onClick={() => handleNavigate("/")} className="text-2xl cursor-pointer">
            CONTACT
          </a>
          <a onClick={() => handleNavigate("/collection")} className="text-2xl cursor-pointer">
            COLLECTION
          </a>
          <a onClick={() => handleNavigate("/AboutUs")} className="text-2xl cursor-pointer">
            ABOUT US
          </a>
          <a onClick={() => handleNavigate("/")} className="text-2xl cursor-pointer">
            OWNER SHIP
          </a>
        </div>
        <div className="flex items-start justify-center space-x-4 pr-14 pt-16">
          <MdFacebook className="text-2xl" />
          <BsTwitterX className="text-2xl" />
          <FaInstagram className="text-2xl" />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
