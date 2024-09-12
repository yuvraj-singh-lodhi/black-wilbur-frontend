import React from "react";
import { IoIosStar } from "react-icons/io";
import tshirt from "../assets/blackT.png";

const Product: React.FC = () => {
  // Array of product images
  const images = [tshirt, tshirt, tshirt]; // Add your actual images here

  return (
    <div className="bg-[#1B1B1B] text-white">
      {/* Top Background Area */}
      <div className="bg-[#D9D9D9] h-[80px]" />

      {/* Main Product Page Container */}
      <div className="relative">
        {/* First Section */}
        <section
          className="flex flex-col lg:flex-row gap-4"
          style={{ height: "calc(3 * 700px + 50px)" }}
        >
          {/* First Column: Product Images */}
          <div className="w-full lg:w-1/2 flex flex-col items-center gap-0 -ml-2">
            {/* Image Containers */}
            <div
              className="relative flex items-center justify-center"
              style={{
                width: "700px",
                height: "700px",
                backgroundColor: "#D9D9D9",
              }}
            >
              <img
                className="w-full h-full object-cover"
                src={tshirt}
                alt="Product Image 1"
                style={{ backgroundColor: "#D9D9D9" }}
              />
            </div>
            <div
              className="relative flex items-center justify-center"
              style={{
                width: "700px",
                height: "700px",
                backgroundColor: "#F0F0F0",
              }}
            >
              <img
                className="w-full h-full object-cover"
                src={tshirt}
                alt="Product Image 2"
                style={{ backgroundColor: "#F0F0F0" }}
              />
            </div>
            <div
              className="relative flex items-center justify-center"
              style={{
                width: "700px",
                height: "700px",
                backgroundColor: "#FDFDFD",
              }}
            >
              <img
                className="w-full h-full object-cover"
                src={tshirt}
                alt="Product Image 3"
                style={{ backgroundColor: "#FDFDFD" }}
              />
            </div>
          </div>

          {/* Second Column: Product Details */}
          <div className="w-full lg:w-1/2 p-6 flex flex-col">
            <h1 className="text-4xl font-bold mb-2">PRODUCT NAME</h1>
            <p className="text-xl mb-4">PRICE</p>

            {/* Star Rating */}
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
              <button className="px-4 py-2 bg-[#1B1B1B] border border-white text-white rounded-full">
                ADD TO CART
              </button>
              <button className="px-4 py-2 bg-white text-black rounded-full">
                BUY NOW!
              </button>
            </div>

            <h4 className="text-xl mb-2">DESCRIPTION</h4>
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

        {/* Second Section */}
        <section className="mt-[80px]">
          <div className="text-left mb-8">
            <h2 className="text-4xl font-normal ml-4">VISIT MORE</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[3px]">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative bg-[#BCBCBC] rounded-sm overflow-hidden"
                style={{ width: "480px", height: "470px" }}
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
    </div>
  );
};

export default Product;
