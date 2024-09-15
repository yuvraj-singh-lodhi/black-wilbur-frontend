import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import img from "../assets/collection-carousel.jpg";
import tshirt from "../assets/blackT.png";
import { MdFilterList } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { AiOutlinePlus, AiOutlineLeft, AiOutlineRight } from "react-icons/ai"; // Import icons for pagination

const TOTAL_PRODUCTS = 50; // Example total number of products

const Collection: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // State to track current page
  const productsPerPage = 12; // Products to show per page
  const totalPages = Math.ceil(TOTAL_PRODUCTS / productsPerPage); // Calculate total pages

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const handleNavigate = (path: string) => {
    navigate(path); // Programmatically navigate to the given path
  };

  // Calculate products for the current page
  const startIdx = (currentPage - 1) * productsPerPage;
  const currentProducts = Array.from({ length: TOTAL_PRODUCTS }).slice(
    startIdx,
    startIdx + productsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      <div className="main-container scrollbar-thin w-full min-h-screen bg-[#1b1b1b] text-white">
        <div className="image-container w-full h-[100vh]">
          <img
            className="w-full h-full object-cover"
            src={img}
            alt="carousel"
            style={{ objectPosition: "center bottom" }}
          />
        </div>
        <div className="content-container w-full bg-[#141414] pb-4">
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
          <div className="product-container w-full mt-6 px-0">
            {/* Grid layout with 3 images per row and 3px gap */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 w-full">
              {currentProducts.map((_, index) => (
                <div
                  key={index}
                  className="relative bg-[#7A7A7A] rounded-sm overflow-hidden flex items-center justify-center"
                >
                  <img
                    className="w-full h-full object-cover cursor-pointer"
                    src={tshirt}
                    onClick={() => handleNavigate("/Product")}
                    alt={`tshirt-${index}`}
                  />
                  <div className="absolute bottom-2 left-2 text-[#282828] text-sm font-semibold">
                    T-SHIRT
                  </div>
                  <div className="absolute bottom-2 right-2 text-[#636363] text-sm font-semibold">
                    300rs
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="pagination-container flex justify-center items-center mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="w-7 h-7 text-black rounded-full bg-white disabled:bg-gray-400 flex items-center justify-center"
            >
              <AiOutlineLeft className="text-xl" /> {/* Previous Icon */}
            </button>
            <span className="mx-4 text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="w-7 h-7 text-black rounded-full bg-white disabled:bg-gray-400 flex items-center justify-center"
            >
              <AiOutlineRight className="text-xl" /> {/* Next Icon */}
            </button>
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
    </>
  );
};

export default Collection;
