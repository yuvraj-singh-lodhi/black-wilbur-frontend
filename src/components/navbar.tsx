import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import logo from "../assets/navlogo.svg";
import Sidebar from "./sidebar";
import AddToCartSidebar from "./addtocartsidebar";
import SearchBar from "./SearchBar";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { logoutUser } from "../services/api";

const Navbar: React.FC = (): JSX.Element => {
  const [sidebar, setSidebar] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const { cartItems } = useCart(); // Access cart items from the cart context
  const { userauth, setUser } = useAuth(); // Access user context
  const navigate = useNavigate();

  const toggleSidebar = (): void => {
    setSidebar(!sidebar);
  };

  const toggleCartSidebar = (): void => {
    setIsCartOpen(!isCartOpen);
  };

  const handleNavigate = (path: string): void => {
    navigate(path);
    setSidebar(false);
  };

  const handleUserIconClick = () => {
    if (userauth) {
      navigate("/UserProfile"); // Redirect to user profile if logged in
    } else {
      handleNavigate("/Login"); // Redirect to login if not logged in
    }
  };

  const handleLogout = () => {
    logoutUser()
    setUser(null); // Clear user from context
    navigate("/Login"); // Redirect to login
  };

  return (
    <>
      <nav className="navbar top-0 left-0 w-full flex items-center justify-between pl-4 pr-4 pb-2 bg-black z-50">
        <div className="hidden md:flex h-24 flex-col w-full">
          {/* For Large Screens */}
          <div className="hidden h-20 md:flex items-center justify-between w-full pl-16 pr-16 text-white border-b-2 border-white">
            <div className="flex items-center space-x-4">
              <MdMenu className="text-4xl cursor-pointer" onClick={toggleSidebar} />
              {/* Render SearchBar directly */}
              <div className="left-32 absolute">
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
                onClick={handleUserIconClick}
                className="text-2xl cursor-pointer"
              />
              
              {/* Display user name and logout button if logged in */}
              {userauth && (
                <div className="flex items-center space-x-4">
                 <span className="text-lg">{userauth.first_name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Logout
                  </button>
                </div>
              )}

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
            {/* Cart Icon with badge */}
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

            {/* User icon with name and logout (if logged in) */}
            <div className="relative flex items-center space-x-2">
              <FaCircleUser
                onClick={handleUserIconClick}
                className="text-xl cursor-pointer"
              />
              {userauth && (
                <div className="flex items-center space-x-2">
                  <span>{userauth.first_name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

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
