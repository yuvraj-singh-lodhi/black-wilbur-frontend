import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdClose, MdFacebook, MdArrowDropDown } from "react-icons/md";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose(); // Close sidebar after navigating
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onClose} // Close sidebar when backdrop is clicked
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#141414] text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex items-center justify-start p-4">
          <MdClose className="text-2xl cursor-pointer" onClick={onClose} />
        </div>
        <div className="flex flex-col items-start justify-center gap-6 pt-20 pl-12 pb-8 font-light tracking-wide ">
          <a
            onClick={() => handleNavigate("/Login")}
            className="text-2xl cursor-pointer"
          >
            LOGIN
          </a>
          <a
            onClick={() => handleNavigate("/")}
            className="text-2xl cursor-pointer"
          >
            CONTACT
          </a>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-2xl cursor-pointer flex items-center"
            >
              COLLECTION
              <MdArrowDropDown className="ml-2 text-xl" />
            </button>
            {isDropdownOpen && (
              <div
                className={`absolute left-0 mt-2 bg-[#141414] rounded-md shadow-lg z-40 transition-all duration-300 ease-in-out`}
                style={{
                  opacity: isDropdownOpen ? 1 : 0,
                  transform: isDropdownOpen
                    ? "translateY(0)"
                    : "translateY(-10px)",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
                }}
              >
                {[
                  "Collection",
                  "Oversize",
                  "Round Neck",
                  "Polo",
                  "Knitted",
                ].map((item) => (
                  <a
                    key={item}
                    onClick={() => handleNavigate("/collection")} // Adjust this path as necessary
                    className="block text-xl px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>
          <a
            onClick={() => handleNavigate("/AboutUs")}
            className="text-2xl cursor-pointer"
          >
            ABOUT US
          </a>
          <a
            onClick={() => handleNavigate("/")}
            className="text-2xl cursor-pointer"
          >
            OWNER SHIP
          </a>
        </div>
        <div className="flex items-start justify-center space-x-4 pr-14 pt-14">
          <MdFacebook className="text-2xl" />
          <BsTwitterX className="text-2xl" />
          <FaInstagram className="text-2xl" />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
