import React, { useState, useEffect } from "react";
import { MdMenu } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import logo from "../assets/navlogo.svg";
import Sidebar from "./sidebar";
import AddToCartSidebar from "./addtocartsidebar";
import SearchBar from "./SearchBar"; // Import the SearchBar component
import { useCart } from "../contexts/CartContext"; // Import useCart

const Navbar: React.FC = (): JSX.Element => {
  const [sidebar, setSidebar] = useState<boolean>(false);
  const [hideNavbar, setHideNavbar] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false); 

  const { cartItems } = useCart(); // Access cart items from the cart context

  const navigate = useNavigate();

  const toggleSidebar = (): void => {
    setSidebar(!sidebar);
  };

  const toggleCartSidebar = (): void => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setHideNavbar(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigate = (path: string): void => {
    navigate(path);
    setSidebar(false);
  };

  const handleSearchIconClick = () => {
    setShowSearchBar(!showSearchBar); 
  };

  return (
    <>
      <nav
        className={`navbar top-0 left-0 w-full flex items-center justify-between pl-4 pr-4 pb-2 bg-black z-50 transition-opacity duration-300 ease-in-out ${
          hideNavbar ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="hidden md:flex h-24 flex-col w-full">
          {/* For Large Screens */}
          <div className="hidden h-20 md:flex items-center justify-between w-full pl-16 pr-16 text-white border-b-2 border-white">
            <div className="flex items-center space-x-4">
              <MdMenu
                className="text-4xl cursor-pointer"
                onClick={toggleSidebar}
              />
              {/* Render SearchBar directly */}
              <div className=" left-32 absolute">
                  <SearchBar />
              </div>
            </div>

            <img
              onClick={() => handleNavigate("/")}
              src={logo}
              alt="BlackWilbur"
              className="h-18 w-40 mx-auto text-white cursor-pointer"
              style={{ filter: "invert(1)" }}
            />
            <div className="flex items-center space-x-4 relative">
              <FaCircleUser
                onClick={() => handleNavigate("/Login")}
                className="text-2xl cursor-pointer"
              />
              
              {/* Cart Icon with badge */}
              <div className="relative">
                <FaShoppingCart
                  onClick={toggleCartSidebar}
                  className="text-2xl cursor-pointer"
                />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Mini Navbar */}
          <div className="hidden h-8 md:flex items-center justify-center w-full pl-16 pr-10 space-x-4 text-white">
            {["Collection", "Oversize", "Round Neck", "Polo", "Knitted"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => handleNavigate("/collection")}
                  className="relative text-sm font-semibold px-4 py-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white after:transform after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>

        {/* For Medium and Small Screens */}
        <div className="flex md:hidden items-center justify-between w-full h-12 p-2 text-white">
          <img
            src={logo}
            alt="BlackWilbur"
            className="h-6 cursor-pointer"
            style={{ filter: "invert(1)" }}
            onClick={() => handleNavigate("/")}
          />
          <div className="flex items-center space-x-4">
            <button onClick={handleSearchIconClick} className="text-xl">
              Search
            </button>
            <div className="relative">
              <FaShoppingCart
                onClick={toggleCartSidebar}
                className="text-xl cursor-pointer"
              />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </div>
            <FaCircleUser
              onClick={() => handleNavigate("/Login")}
              className="text-xl cursor-pointer"
            />
            <MdMenu
              className="text-2xl cursor-pointer pr-2"
              onClick={toggleSidebar}
            />
          </div>
        </div>
      </nav>

      {/* Sidebar component */}
      <Sidebar isOpen={sidebar} onClose={() => setSidebar(false)} />

      {/* Add to Cart Sidebar */}
      <div className="text-black">
        <AddToCartSidebar 
          isOpen={isCartOpen} 
          onClose={toggleCartSidebar} 
        />
      </div>
    </>
  );
};

export default Navbar;
