import React, { useState } from "react";
import { IoIosStar } from "react-icons/io";
import tshirt from "../assets/blackT.png";
import { useNavigate } from "react-router-dom";
import AddToCartSidebar from "./addtocartsidebar";

const Product: React.FC = () => {
  const images = [tshirt, tshirt, tshirt];
  const [isCartOpen, setIsCartOpen] = useState(false);

  const navigate = useNavigate(); // Initialize the useNavigate hook inside the component
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  const handleNavigate = (path: string) => {
    navigate(path); // Programmatically navigate to the given path
  };

  return (
    <div className="bg-[#1B1B1B] text-white  min-h-screen">
      <div className="bg-[#1B1B1B] h-[80px]" />
      <div className="container mx-auto px-4  sm:px-6 lg:px-8">
        <section className="flex flex-col lg:pt-12 lg:flex-row gap-10 justify-center items-start">
          <div className="w-full lg:w-1/2 flex flex-col lg:flex-row items-center gap-0">
            <div
              className="relative flex lg:flex-col items-center gap-2 overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden hover:overflow-scroll scrollbar-none"
              style={{
                width: "100%",
                maxWidth: "800px",
                height: "100%",
                maxHeight: "750px",
              }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-center ${
                    index % 2 === 0 ? "bg-[#7A7A7A]" : "bg-[#7A7A7A]"
                  }`}
                  style={{
                    width: "100%",
                    height: "100%",
                    minWidth: "100%",
                    maxHeight: "750px",
                  }}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={image}
                    alt={`Product Image ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="w-full lg:w-1/2 p-6 flex flex-col">
            <h1 className="text-2xl lg:text-4xl font-bold mb-2">
              PRODUCT NAME
            </h1>
            <p className="text-lg lg:text-xl mb-4">PRICE</p>

            <div className="flex items-center mb-4">
              {[1, 2, 3].map((_, index) => (
                <IoIosStar
                  key={index}
                  className={`w-6 h-6 ${
                    index === 2 ? "text-yellow-500" : "text-white"
                  }`}
                  style={{ marginRight: "5px" }}
                />
              ))}
            </div>

            <p className="text-sm mb-1">SELECT SIZE</p>
            <div className="flex gap-2 mb-4">
              {["S", "M", "L", "XL"].map((size) => (
                <div
                  key={size}
                  className="w-8 h-8 border rounded-full flex items-center justify-center border-gray-300"
                >
                  {size}
                </div>
              ))}
            </div>

            <div className="flex gap-4 mb-8">
              <button
                onClick={toggleCart}
                className="px-4 py-2 bg-[#1B1B1B] border border-white text-white rounded-full"
              >
                ADD TO CART
              </button>
              <button
                onClick={() => handleNavigate("/Checkout")}
                className="px-4 py-2 bg-white text-black rounded-full"
              >
                BUY NOW!
              </button>
            </div>

            <h4 className="text-lg lg:text-xl mb-2">DESCRIPTION</h4>
            <p className="text-sm mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-sm">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </section>

        {/* "Visit More" Section */}
        <section className="mt-[80px] h-lvh ">
          <div className="text-left ">
            <h2 className="ml-4 lg:ml-16 px-6 text-2xl lg:text-5xl font-normal font-montserrat uppercase leading-tight text-white mb-8">
              VISIT MORE
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative bg-[#7A7A7A] rounded-sm overflow-hidden"
                style={{ width: "100%", height: "600px" }}
              >
                <img
                  className="w-full h-full object-cover"
                  src={image}
                  alt={`Visit More ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
 <div className="text-black">
      <AddToCartSidebar isOpen={isCartOpen} onClose={toggleCart} />
      </div>    </div>
  );
};

export default Product;
