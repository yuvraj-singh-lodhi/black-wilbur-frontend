import React from "react";
import { MdClose, MdFacebook } from "react-icons/md";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
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
          <a href="#" className="text-2xl">
            LOGIN
          </a>
          <a href="#" className="text-2xl">
            CONTACT
          </a>
          <a href="#" className="text-2xl">
            COLLECTION
          </a>
          <a href="#" className="text-2xl">
            ABOUT US
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
