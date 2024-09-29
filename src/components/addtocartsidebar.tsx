import React from 'react';
import { MdClose } from 'react-icons/md';
import { useCart } from "../contexts/CartContext";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface AddToCartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddToCartSidebar: React.FC<AddToCartSidebarProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, totalAmount } = useCart();
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle checkout
  const handleCheckout = () => {
    onClose(); // Optionally close the sidebar
    navigate('/checkout'); // Redirect to the checkout page
  };

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
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center mb-4">
                <img
                  src={`/api/placeholder/400/320`}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="ml-4 flex-1">
                  <p className="font-bold">{item.product.name}</p>
                  <p className="text-sm">Size: {item.size}</p>
                  <p className="text-sm">
                    {item.quantity} x ₹{item.product.price}
                  </p>
                  <div className="flex mt-2">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded-md"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded-md"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 text-sm mt-2 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
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
            onClick={handleCheckout} // Call the checkout handler
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
