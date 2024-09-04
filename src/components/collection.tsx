import React, { useState } from "react";
import img from "../assets/collection-carousel.jpg";
import tshirt from "../assets/blackT.png";
import { MdFilterList } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import Footer from "../components/footer";
import "../index.css";

const Collection: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <>
      <div className="main-container scrollbar-thin w-full min-h-screen bg-[#1b1b1b] text-white">
        <div className="image-container w-full h-[88vh]">
          <img
            className="w-full h-full object-cover"
            src={img}
            alt="carousel"
          />
        </div>
        <div className="content-container w-full bg-[#141414] p-6 sm:p-8 md:p-10 lg:p-12">
          <div className="header-container w-full flex justify-between items-center p-6 border-b border-[#6C6C6C]">
            <div
              className="collections text-[#FFFFFF] font-bold"
              style={{
                fontWeight: 600,
                fontSize: "clamp(2rem, 5vw, 4.6rem)",
                lineHeight: "77px",
              }}
            >
              COLLECTIONS
            </div>
            <div className="flex items-center">
              <div
                className="filters hidden md:block text-[#FFFFFF] font-medium cursor-pointer"
                style={{
                  fontWeight: 200,
                  fontSize: "clamp(1.5rem, 3vw, 1.75rem)",
                  lineHeight: "89px",
                  width: "115px",
                  height: "89px",
                }}
                onClick={toggleSidebar}
              >
                FILTERS
              </div>
              <MdFilterList
                className="text-[#FFFFFF] text-2xl md:hidden cursor-pointer"
                onClick={toggleSidebar}
              />
            </div>
          </div>
          <div className="product-container text-center mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="card bg-[#BCBCBC] rounded-sm overflow-hidden flex items-center justify-center"
                >
                  <img
                    className="w-full h-auto object-cover"
                    src={tshirt}
                    alt={`tshirt-${index}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 w-80 h-full bg-[#141414] text-white z-50 flex flex-col items-center transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="pt-6 pb-4 border-b border-[#6C6C6C] flex justify-between items-center w-[220px]">
            <span className="text-lg font-normal">FILTERS</span>
            <MdClose
              className="text-xl cursor-pointer"
              onClick={toggleSidebar}
            />
          </div>
          <div className="flex-grow mt-36 w-[235px]">
            <div className="mb-4 flex items-center justify-between">
              <span>SIZE</span>
              <AiOutlinePlus className="text-md" />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <span>PRICE</span>
              <AiOutlinePlus className="text-md" />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <span>CATEGORY</span>
              <AiOutlinePlus className="text-md" />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <span>AVAILABILITY</span>
              <AiOutlinePlus className="text-md" />
            </div>
          </div>
          <div className="px-4 py-2 flex flex-col justify-between h-full items-center">
            <div className="border border-[#6c6c6c] text-white text-center py-2 rounded-full w-[230px] h-[40px]">
              SORTED BY
            </div>
            <div className="">
              <div className="text-center py-2 mb-4 border-b border-[#6C6C6C] text-white w-[60px]">
                RESET
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Collection;
