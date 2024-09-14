// import React, { useState, useEffect } from "react";
// import { MdMenu } from "react-icons/md";
// import { FaSearch } from "react-icons/fa";
// import { FaCircleUser } from "react-icons/fa6";
// import { FaCartShopping } from "react-icons/fa6";
// import { useNavigate } from "react-router-dom";
// import logo from "../assets/navlogo.svg";
// import Sidebar from "./sidebar";

// const Navbar: React.FC = () => {
//   const [sidebar, setSidebar] = useState(false);
//   const [hideNavbar, setHideNavbar] = useState(false);
//   const navigate = useNavigate();

//   const toggleSidebar = () => {
//     setSidebar(!sidebar);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       setHideNavbar(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const handleNavigate = (path: string) => {
//     navigate(path);
//   };

//   return (
//     <>
//       <nav
//         className={`navbar  top-0 left-0 w-full flex items-center justify-between p-4 bg-white z-50 ${
//           hideNavbar ? "hidden" : "static"
//         }`}
//       >
//         <div className="hidden md:flex h-30 flex-col w-full">
//           {/* For Large Screens */}
//           <div className="hidden h-20 md:flex items-center justify-between w-full pl-16 pr-16 border-b-2 border-black ">
//             <MdMenu
//               className="text-2xl cursor-pointer"
//               onClick={toggleSidebar}
//             />
//             <img
//               onClick={() => handleNavigate("/")}
//               src={logo}
//               alt="BlackWilbur"
//               className="h-8 mx-auto"
//             />
//             <div className="flex items-center space-x-4">
//               <FaSearch className="text-xl" />
//               <FaCircleUser
//                 onClick={() => handleNavigate("/Login")}
//                 className="text-xl"
//               />
//             </div>
//           </div>
//           {/* Mini Navbar */}
//           <div className="hidden h-8 md:flex items-center justify-center w-full pl-16 pr-10 space-x-4">
//             {/* Buttons that use navigate */}
//             <button
//               onClick={() => handleNavigate("/collection")}
//               className="relative text-sm font-semibold px-4 py-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-black after:transform after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
//             >
//               Collection
//             </button>
//             <button
//               onClick={() => handleNavigate("/tshirt")}
//               className="relative text-sm font-semibold px-4 py-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-black after:transform after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
//             >
//               T-shirt
//             </button>
//             <button
//               onClick={() => handleNavigate("/oversized-tshirt")}
//               className="relative text-sm font-semibold px-4 py-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-black after:transform after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
//             >
//               Oversized T-shirt
//             </button>
//             <button
//               onClick={() => handleNavigate("/pants")}
//               className="relative text-sm font-semibold px-4 py-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-black after:transform after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
//             >
//               Pants
//             </button>
//           </div>
//         </div>

//         {/* For Medium and Small Screens */}
//         <div className="flex md:hidden items-center justify-between w-full  ">
//           <img src={logo} alt="BlackWilbur" className="h-6" />
//           <div className="flex items-center space-x-4">
//             <FaCircleUser className="text-xl" />
//             <FaSearch className="text-xl" />
//             <MdMenu
//               className="text-2xl cursor-pointer pr-2"
//               onClick={toggleSidebar}
//             />
//           </div>
//         </div>
//       </nav>

//       {/* Sidebar component */}
//       <Sidebar isOpen={sidebar} onClose={toggleSidebar} />
//     </>
//   );
// };

// export default Navbar;

// ❌❌❌❌

import React, { useState, useEffect } from "react";
import { MdMenu } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping, FaCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import logo from "../assets/navlogo.svg";
import Sidebar from "./sidebar";

const Navbar: React.FC = () => {
  const [sidebar, setSidebar] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebar(!sidebar);
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

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <nav
        className={`navbar top-0 left-0 w-full flex items-center justify-between p-4 bg-white z-50 ${
          hideNavbar ? "hidden" : "static"
        }`}
      >
        <div className="hidden md:flex h-30 flex-col w-full">
          {/* For Large Screens */}
          <div className="hidden h-20 md:flex items-center justify-between w-full pl-16 pr-16 border-b-2 border-black">
            <MdMenu
              className="text-2xl cursor-pointer"
              onClick={toggleSidebar}
            />
            <img
              onClick={() => handleNavigate("/")}
              src={logo}
              alt="BlackWilbur"
              className="h-8 mx-auto"
            />
            <div className="flex items-center space-x-4">
              <FaSearch className="text-xl" />
              <FaCircleUser
                onClick={() => handleNavigate("/Login")}
                className="text-xl"
              />
              <FaCartShopping
                onClick={() => handleNavigate("/cart")}
                className="text-xl"
              />
            </div>
          </div>
          {/* Mini Navbar */}
          <div className="hidden h-8 md:flex items-center justify-center w-full pl-16 pr-10 space-x-4">
            <button
              onClick={() => handleNavigate("/collection")}
              className="relative text-sm font-semibold px-4 py-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-black after:transform after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
            >
              Collection
            </button>
            <button
              onClick={() => handleNavigate("/tshirt")}
              className="relative text-sm font-semibold px-4 py-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-black after:transform after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
            >
              T-shirt
            </button>
            <button
              onClick={() => handleNavigate("/oversized-tshirt")}
              className="relative text-sm font-semibold px-4 py-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-black after:transform after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
            >
              Oversized T-shirt
            </button>
            <button
              onClick={() => handleNavigate("/pants")}
              className="relative text-sm font-semibold px-4 py-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-black after:transform after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
            >
              Pants
            </button>
          </div>
        </div>

        {/* For Medium and Small Screens */}
        <div className="flex md:hidden items-center justify-between w-full">
          <img src={logo} alt="BlackWilbur" className="h-6" />
          <div className="flex items-center space-x-4">
            <FaCircleUser className="text-xl" />
            <FaSearch className="text-xl" />
            <FaCartShopping
              onClick={() => handleNavigate("/cart")}
              className="text-xl"
            />
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
