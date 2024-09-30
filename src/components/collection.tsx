import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/BG.jpg";
import { MdFilterList, MdClose } from "react-icons/md";
import { AiOutlinePlus, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useCategories } from "../contexts/CategoryContext"; // Importing Category Context
import { useProducts } from "../contexts/ProductContext"; // Importing Product Context
import { Category } from "../types";

const Collection: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSize, setShowSize] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAvailability, setSelectedAvailability] = useState<boolean | null>(null);

  const productsPerPage = 12;
  const navigate = useNavigate();

  const { categories } = useCategories();
  const { products } = useProducts(); 
  
  const getCategoryNameById = (categoryId: string | Category) => {
    const category = categories.find((category) => category.id === categoryId);
    return category ? category.name : undefined;
  };
  
  const filteredProducts = products.filter((product) => {
    if (selectedSize && !product.size.includes(selectedSize)) {
      return false;
    }
  
    if (selectedPrice) {
      const price = product.price;
      if (selectedPrice === "Below $50" && price >= 50) return false;
      if (selectedPrice === "$50 - $100" && (price < 50 || price > 100)) return false;
      if (selectedPrice === "Above $100" && price <= 100) return false;
    }
  
    if (selectedCategory) {
      const productCategoryName = getCategoryNameById(product.category);
      if (productCategoryName !== selectedCategory) {
        return false;
      }
    }
  
    if (selectedAvailability && product.availability !== selectedAvailability) {
      return false;
    }
  
    return true;
  });
  
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIdx = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIdx,
    startIdx + productsPerPage
  );

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts]);

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
            <div className="collections text-4xl lg:text-5xl font-normal font-montserrat uppercase leading-tight text-white mb-2 text-start">
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

          {/* Product grid */}
          <div className="product-container w-full mt-6 px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 w-full">
              {currentProducts.map((product, index) => (
                <div
                  key={index}
                  className="relative bg-[#7A7A7A] rounded-sm overflow-hidden flex items-center justify-center"
                  style={{ height: "95vh" }}
                >
                  <img
                    className="w-full h-full object-cover cursor-pointer"
                    src={product.images}
                    onClick={() => handleNavigate("/Product")}
                    alt={product.name}
                  />
                  <div className="absolute bottom-2 left-2 text-[#282828] text-sm font-semibold">
                    {product.name}
                  </div>
                  <div className="absolute bottom-2 right-2 text-[#636363] text-sm font-semibold">
                    {product.price}rs
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
              <AiOutlineLeft className="text-xl" />
            </button>
            <span className="mx-4 text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="w-7 h-7 text-black rounded-full bg-white disabled:bg-gray-400 flex items-center justify-center"
            >
              <AiOutlineRight className="text-xl" />
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
            <MdClose className="text-xl cursor-pointer" onClick={toggleSidebar} />
          </div>
          <div className="flex-grow mt-6 w-[235px]">
            {/* SIZE Filter */}
            <div className="mb-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setShowSize(!showSize)}
              >
                <span>SIZE</span>
                <AiOutlinePlus className="text-md" />
              </div>
              {showSize && (
                <div className="mt-2">
                  <div className="cursor-pointer" onClick={() => setSelectedSize("Small")}>Small</div>
                  <div className="cursor-pointer" onClick={() => setSelectedSize("Medium")}>Medium</div>
                  <div className="cursor-pointer" onClick={() => setSelectedSize("Large")}>Large</div>
                </div>
              )}
            </div>

            {/* PRICE Filter */}
            <div className="mb-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setShowPrice(!showPrice)}
              >
                <span>PRICE</span>
                <AiOutlinePlus className="text-md" />
              </div>
              {showPrice && (
                <div className="mt-2">
                  <div className="cursor-pointer" onClick={() => setSelectedPrice("Below $50")}>Below $50</div>
                  <div className="cursor-pointer" onClick={() => setSelectedPrice("$50 - $100")}>$50 - $100</div>
                  <div className="cursor-pointer" onClick={() => setSelectedPrice("Above $100")}>Above $100</div>
                </div>
              )}
            </div>

            {/* CATEGORY Filter */}
            <div className="mb-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setShowCategory(!showCategory)}
              >
                <span>CATEGORY</span>
                <AiOutlinePlus className="text-md" />
              </div>
              {showCategory && (
                <div className="mt-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* AVAILABILITY Filter */}
            <div className="mb-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setShowAvailability(!showAvailability)}
              >
                <span>AVAILABILITY</span>
                <AiOutlinePlus className="text-md" />
              </div>
              {showAvailability && (
                <div className="mt-2">
                  <div className="cursor-pointer" onClick={() => setSelectedAvailability(true)}>
                    In Stock
                  </div>
                  <div className="cursor-pointer" onClick={() => setSelectedAvailability(false)}>
                    Out of Stock
                  </div>
                </div>
              )}
            </div>

            <div className="apply-filters-button bg-white text-black cursor-pointer w-full py-2 mt-4">
              APPLY FILTERS
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
