import React, { useState, useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import AddToCartSidebar from "./addtocartsidebar";
import SizeSelectionModal from "./SizeSelectionModal";
import { Product as ProductType } from "../types";
import { useCart } from "../contexts/CartContext";
import { useSingleProduct } from "../contexts/SingleProductContext"; // Import your SingleProductContext
import { useProducts } from "../contexts/ProductContext"; // Import your ProductContext

const Product: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const navigate = useNavigate(); // Initialize the navigate function

  const [modalOpen, setModalOpen] = useState(false);
  const { setSingleProduct } = useSingleProduct(); // Use SingleProductContext
  const { products } = useProducts(); // Get products from ProductContext

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
    setModalOpen(true); // Open size selection modal for size selection
  };

  const handleConfirmBuyNow = (size: string) => {
    if (product) {
      setSingleProduct(product); // Set the selected product in context
      addToCart(product, 1, size); // Add to cart with selected size
      navigate("/checkout"); // Navigate to Checkout
    }
  };

  const handleRelatedProductClick = (relatedProductId: number) => {
    navigate(`/product/${relatedProductId}`); // Navigate to the product detail page with the related product ID
  };

  useEffect(() => {
    if (id) {
      const foundProduct = products.find((p) => p.id === Number(id)); // Find the product in context
      if (foundProduct) {
        setProduct(foundProduct);
        const filtered = products.filter((p) => p.id !== foundProduct.id).slice(0, 3);
        setRelatedProducts(filtered); // Set related products
      }
    }
  }, [id, products]);

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
            <div className="flex lg:flex-col flex-row items-center w-full h-full overflow-x-scroll">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center justify-center bg-[#7A7A7A] w-full h-full min-w-[300px] md:min-w-[400px]"
                >
                  <img
                    className="w-full h-full object-cover"
                    src={image} // Use the image from the array
                    alt={`Product Image ${product.name}`}
                  />
                </div>
              ))}
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
                onClick={handleBuyNow} // Open size selection modal
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
                  className="relative bg-[#7A7A7A] rounded-sm overflow-hidden cursor-pointer"
                  style={{ width: "100%", height: "auto" }}
                  onClick={() => handleRelatedProductClick(relatedProduct.id)} // Add click handler
                >
                  <img
                    className="w-full h-auto object-cover"
                    src={relatedProduct.images[0]} // Assuming images is an array
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
        onConfirmBuyNow={handleConfirmBuyNow} // Add this prop
        productName={product ? product.name : ""}
        productId={product ? product.id : 0} // Make sure product.id is defined
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
