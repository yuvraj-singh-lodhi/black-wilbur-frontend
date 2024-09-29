import React, { useState, useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import AddToCartSidebar from "./addtocartsidebar";
import SizeSelectionModal from "./SizeSelectionModal";
import { fetchProductById, fetchProducts } from "../services/api";
import { Product as ProductType } from "../types";
import { useCart } from "../contexts/CartContext";
import { useSingleProduct } from "../contexts/SingleProductContext"; // Import your SingleProductContext

const Product: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const [modalOpen, setModalOpen] = useState(false);
  const { setSingleProduct } = useSingleProduct(); // Use SingleProductContext

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleAddToCart = () => {
    setModalOpen(true);
  };

  const handleConfirmAddToCart = (size: string) => {
    if (product) {
      addToCart(product, 1, size);
      setModalOpen(false);
      toggleCart();
    }
  };

  const handleBuyNow = () => {
    if (product) {
      setSingleProduct(product); // Set the selected product in context
      navigate("/checkout"); // Navigate to Checkout
    }
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        if (id) {
          const productData = await fetchProductById(Number(id));
          setProduct(productData);
          const allProducts = await fetchProducts();
          const filtered = allProducts.filter(p => p.id !== productData.id).slice(0, 3);
          setRelatedProducts(filtered);
        }
      } catch (error) {
        console.error("Error fetching product data", error);
      }
    };

    fetchProductData();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#1B1B1B] text-white min-h-screen mt-8">
      <div className="bg-[#1B1B1B] h-[80px]" />
      <div className="w-full">
        <section className="w-full flex flex-col lg:flex-row gap-10">
          {/* Image Section */}
          <div className="w-full md:h-[85vh] sm:h-[85vh] lg:h-[750px] lg:w-1/2 flex lg:flex-col flex-row bg-slate-50 overflow-x-auto md:overflow-x-auto">
            <div className="relative flex lg:flex-col flex-row items-center w-[100%] h-full">
              <div className="flex-shrink-0 flex items-center justify-center bg-[#7A7A7A] w-full h-full">
                <img
                  className="w-full h-full object-cover"
                  src={product.images?.[0]?.image || `/api/placeholder/400/320`}
                  alt={`Product Image ${product.name}`}
                />
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="w-full lg:w-1/2 p-6 flex flex-col">
            <h1 className="text-2xl lg:text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-lg lg:text-xl mb-4">Price: ₹{product.price}</p>

            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, index) => (
                <IoIosStar
                  key={index}
                  className={`w-6 h-6 ${index < 5 ? "text-yellow-500" : "text-white"}`}
                  style={{ marginRight: "5px" }}
                />
              ))}
            </div>

            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="px-4 py-2 bg-[#1B1B1B] border border-white text-white rounded-full"
              >
                ADD TO CART
              </button>
              <button
                onClick={handleBuyNow} // Use the new handleBuyNow function
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
        <section className="mt-[80px] py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-left">
            <h2 className="ml-4 lg:ml-16 text-2xl lg:text-5xl font-normal font-montserrat uppercase leading-tight text-white mb-8">
              VISIT MORE
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="relative bg-[#7A7A7A] rounded-sm overflow-hidden"
                  style={{ width: "100%", height: "auto" }}
                >
                  <img
                    className="w-full h-auto object-cover"
                    src={relatedProduct.images?.[0]?.image || `/api/placeholder/400/320`}
                    alt={`Visit More ${relatedProduct.name}`}
                  />
                  <div className="p-2">
                    <h3 className="text-lg">{relatedProduct.name}</h3>
                    <p className="text-sm">Price: ₹{relatedProduct.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No additional products available.</p>
            )}
          </div>
        </section>
      </div>

      {/* Size Selection Modal */}
      <SizeSelectionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddToCart={handleConfirmAddToCart}
        productName={product ? product.name : ""}
      />

      <div className="text-black">
        <AddToCartSidebar 
          isOpen={isCartOpen} 
          onClose={toggleCart} 
        />
      </div>
    </div>
  );
};

export default Product;
