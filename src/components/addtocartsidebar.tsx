import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useCart } from "../contexts/CartContext";
import { useUserContext } from "../contexts/UserContext"; 
import { useNavigate } from 'react-router-dom'; 
import { useProducts } from '../contexts/ProductContext';
import { Product } from '../types'; // Adjust import based on your structure

interface AddToCartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddToCartSidebar: React.FC<AddToCartSidebarProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, totalAmount } = useCart();
  const { user } = useUserContext(); 
  const navigate = useNavigate(); 
  const [productInfo, setProductInfo] = useState<Product[]>([]); // Adjusted to use Product type
  const { getProductById } = useProducts(); // Get the getProductById function from context

  const handleCheckout = () => {
    onClose(); 
    navigate('/checkout'); 
  };

  const userCartItems = user?.cartItems || [];

  useEffect(() => {
    const fetchProductInfo = () => {
      try {
        const products = userCartItems.map(item => {
          const product = getProductById(item.product); // Use getProductById from context
          return product; // Return the found product
        }).filter(product => product !== undefined) as Product[]; // Filter out any undefined values
        
        setProductInfo(products); // Set the fetched products
      } catch (error) {
        console.error('Error fetching product information:', error);
      }
    };

    if (userCartItems.length > 0) {
      fetchProductInfo();
    }
  }, [getProductById, userCartItems]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onClose}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-screen w-80 bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-300">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <MdClose className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto h-[calc(100vh-250px)]">
          {userCartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            productInfo.map((product, index) => (
              product ? ( // Ensure product is defined
                <div key={index} className="flex items-center mb-4">
                  <img
                    src={product.images[0]} // Adjust as per your images structure
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="ml-4 flex-1">
                    <p className="font-bold">{product.name}</p>
                    <p className="text-sm">Size: {userCartItems[index]?.size}</p>
                    <p className="text-sm">
                      {userCartItems[index]?.quantity} x ₹{product.price}
                    </p>
                    <div className="flex mt-2">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded-md"
                        onClick={() => updateQuantity(product.id, userCartItems[index]?.quantity - 1)}
                        disabled={userCartItems[index]?.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-4">{userCartItems[index]?.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 rounded-md"
                        onClick={() => updateQuantity(product.id, userCartItems[index]?.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-red-500 text-sm mt-2 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : null
            ))
          )}
        </div>

        <div className="p-4 border-t border-gray-300">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{totalAmount.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹{totalAmount.toLocaleString('en-IN')}</span>
          </div>

          <button 
            onClick={handleCheckout} 
            className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default AddToCartSidebar;
