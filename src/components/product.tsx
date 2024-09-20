import React, { useState } from "react";
import { IoIosStar } from "react-icons/io";
import tshirt from "../assets/blackT.png";
import { useNavigate } from "react-router-dom";
import AddToCartSidebar from "./addtocartsidebar";

// Sample product data
const sampleProduct = {
  name: "Black T-Shirt",
  price: "₹999",
  description: `This black T-shirt is made from high-quality cotton and offers superior comfort for everyday wear.
  Its minimalistic design makes it easy to pair with any casual outfit.`,
  sizes: ["S", "M", "L", "XL"],
  rating: 4.5,
  images: [tshirt, tshirt, tshirt], // Array of product images
};

const Product: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [product] = useState(sampleProduct); // Set product data

  const navigate = useNavigate();
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <div className="bg-[#1B1B1B] text-white min-h-screen mt-8">
      <div className="bg-[#1B1B1B] h-[80px]" />
      <div className="w-full">
        <section className="w-full flex flex-col lg:flex-row gap-10">
          {/* Image Section */}

          <div className="w-full md:h-[85vh] sm:h-[85vh] lg:h-[750px] lg:w-1/2 flex lg:flex-col flex-row bg-slate-50 overflow-x-auto md:overflow-x-auto">
            <div className="relative flex lg:flex-col flex-row items-center w-[100%] h-full">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center justify-center bg-[#7A7A7A] w-full h-full"
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
              {product.name}
            </h1>
            <p className="text-lg lg:text-xl mb-4">{product.price}</p>

            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, index) => (
                <IoIosStar
                  key={index}
                  className={`w-6 h-6 ${
                    index < Math.floor(product.rating)
                      ? "text-yellow-500"
                      : "text-white"
                  }`}
                  style={{ marginRight: "5px" }}
                />
              ))}
            </div>

            <p className="text-sm mb-1">SELECT SIZE</p>
            <div className="flex gap-2 mb-4">
              {product.sizes.map((size) => (
                <div
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`w-8 h-8 border rounded-full flex items-center justify-center border-gray-300 cursor-pointer ${
                    selectedSize === size ? "bg-gray-300 text-black" : ""
                  }`}
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
            <p className="text-sm mb-2">{product.description}</p>
          </div>
        </section>

        {/* "Visit More" Section */}
        <section className="mt-[80px] px-4 sm:px-6 lg:px-8">
          <div className="text-left">
            <h2 className="ml-4 lg:ml-16 text-2xl lg:text-5xl font-normal font-montserrat uppercase leading-tight text-white mb-8">
              VISIT MORE
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="relative bg-[#7A7A7A] rounded-sm overflow-hidden"
                style={{ width: "100%", height: "auto" }}
              >
                <img
                  className="w-full h-auto object-cover"
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
      </div>
    </div>
  );
};

export default Product;
