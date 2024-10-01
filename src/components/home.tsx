import React, { useEffect, useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import carousel1 from "../assets/bg2.jpg";
import videoSrc from "../assets/video-thumbnail.mp4";
import blackBackground from "../assets/blackBackground.png";
import { ProductContext } from "../contexts/ProductContext";
import { useCart } from "../contexts/CartContext";
import { UIContext } from "../contexts/UIContext";
import { Product } from "../types";
import SizeSelectionModal from "../components/SizeSelectionModal"; // Import the modal

const Home: React.FC = () => {
  const { products, fetchProducts, loading } = useContext(ProductContext)!;
  const { addToCart } = useCart();
  const { setNotification } = useContext(UIContext)!;
  const navigate = useNavigate();
  const productRef = useRef<HTMLDivElement | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Store the selected product for the modal

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const scrollLeft = () => {
    if (productRef.current) {
      productRef.current.scrollBy({ top: 0, left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (productRef.current) {
      productRef.current.scrollBy({ top: 0, left: 300, behavior: "smooth" });
    }
  };

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product); // Set the selected product
    setModalOpen(true); // Open the modal
  };

  const handleConfirmAddToCart = (size: string) => {
    if (selectedProduct) {
      addToCart(selectedProduct, 1, size); // Pass the selected size to the addToCart function
      setNotification({ type: "success", message: "Product added to cart." });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Modal for Size Selection */}
      <SizeSelectionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddToCart={handleConfirmAddToCart}
        productName={selectedProduct ? selectedProduct.name : ""}
      />

      {/* Carousel Section */}
      <div className="relative h-screen overflow-hidden">
        <img
          src={carousel1}
          alt="Carousel 1"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center top" }}
        />
        {/* Carousel content omitted for brevity */}
      </div>

      {/* Best Sellers Section */}
      <section className="py-16 bg-[#1B1B1B] w-full relative overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-8">
          <h2 className="text-4xl lg:text-5xl font-normal font-montserrat uppercase leading-tight text-white mb-8 text-start">
            Our Bestsellers
          </h2>

          <div className="flex items-center">
            <button
              onClick={scrollLeft}
              className="text-white bg-black rounded-full p-2 mr-2 hover:bg-gray-800 transition"
            >
              &lt;
            </button>
            <div
              ref={productRef}
              className="flex gap-2 overflow-x-auto w-full snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {products.map((product) => {
                const productImage = product.images[0]; // Assuming 'images' is an array of ProductImage
                return (
                  <div
                    key={product.id}
                    className="min-w-[300px] sm:min-w-[350px] lg:min-w-[400px] relative card bg-[#7A7A7A] overflow-hidden flex items-center justify-center snap-start"
                    style={{ height: "100vh" }}
                  >
                    <img
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                      onClick={() => handleNavigate(`/Product/${product.id}`)}
                      src={productImage ? productImage.image : ""} // Ensure image URL is passed
                      alt={product.name}
                    />
                    <div className="absolute bottom-4 left-4 text-[#282828] text-lg font-semibold">
                      {product.name.toUpperCase()}
                    </div>
                    <div className="absolute bottom-4 right-4 text-[#636363] text-lg font-semibold">
                      {product.price} rs
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="absolute top-4 left-4 text-white bg-black rounded-full p-2 hover:bg-gray-800 transition"
                    >
                      🛒
                    </button>
                  </div>
                );
              })}
            </div>
            <button
              onClick={scrollRight}
              className="text-white bg-black rounded-full p-2 ml-2 hover:bg-gray-800 transition"
            >
              &gt;
            </button>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-[#1B1B1B]">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="relative">
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              className="w-full max-w-full"
              style={{ height: "100vh", objectFit: "cover" }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Explore Our Collections Section */}
      {/* <section className="py-16 bg-[#1b1b1b] text-white">
        <div className="container mx-auto">
          <h2 className="text-4xl px-2 lg:text-5xl lg:px-16 font-normal font-montserrat uppercase leading-tight text-white mb-8 text-start">
            Explore Our Collections
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-1 px-2">
            {products.map((product) => {
              const productImage = product.images[0]; 
              return (
                <div
                  key={product.id}
                  className="min-w-[300px] sm:min-w-[350px] lg:min-w-[400px] relative card bg-[#7A7A7A] overflow-hidden flex items-center justify-center snap-start"
                  style={{ height: "100vh" }}
                >
                  <img
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                    onClick={() => handleNavigate(`/Product/${product.id}`)}
                    src={productImage ? productImage.image : ""} 
                    alt={product.name}
                  />
                  <div className="absolute bottom-4 left-4 text-[#282828] text-lg font-semibold">
                    {product.name.toUpperCase()}
                  </div>
                  <div className="absolute bottom-4 right-4 text-[#636363] text-lg font-semibold">
                    {product.price} rs
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="absolute top-4 left-4 text-white bg-black rounded-full p-2 hover:bg-gray-800 transition"
                  >
                    🛒
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex justify-center">
            <button
              className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
              onClick={() => handleNavigate("/collection")}
            >
              Shop Collections
            </button>
          </div>
        </div>
      </section>   */}

      <section className="py-16 bg-[#1b1b1b] text-white">
        <div className="container mx-auto">
          <h2 className="text-4xl px-2 lg:text-5xl lg:px-16 font-normal font-montserrat uppercase leading-tight text-white mb-8 text-start">
            Explore Our Collections
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5 px-2">
            {" "}
            {/* Set gap to 0.5 for ~2px */}
            {products.map((product) => {
              const productImage = product.images[0];
              return (
                <div
                  key={product.id}
                  className="relative card bg-[#7A7A7A] overflow-hidden flex items-center justify-center"
                  style={{ height: "100vh" }}
                >
                  <img
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                    onClick={() => handleNavigate(`/Product/${product.id}`)}
                    src={productImage ? productImage.image : ""}
                    alt={product.name}
                  />
                  <div className="absolute bottom-4 left-4 text-[#282828] text-lg font-semibold">
                    {product.name.toUpperCase()}
                  </div>
                  <div className="absolute bottom-4 right-4 text-[#636363] text-lg font-semibold">
                    {product.price} rs
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="absolute top-4 left-4 text-white bg-black rounded-full p-2 hover:bg-gray-800 transition"
                  >
                    🛒
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex justify-center">
            <button
              className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
              onClick={() => handleNavigate("/collection")}
            >
              Shop Collections
            </button>
          </div>
        </div>
      </section>

      {/* Why Black Section */}
      <section className="relative py-16 bg-black mb-28">
        <div
          className="absolute inset-0"
          style={{
            width: "100%",
            height: "706px",
          }}
        >
          <img
            src={blackBackground}
            alt="Black Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4 py-16">
          <div className="flex flex-col items-center justify-center">
            <h2
              className="font-montserrat text-[48px] lg:text-[93px] font-semibold leading-[81px] text-center mt-20 mb-24"
              style={{
                width: "100%",
                maxWidth: "599px",
              }}
            >
              Why Black
            </h2>
            <button
              className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition"
              onClick={() => handleNavigate("/about")}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
