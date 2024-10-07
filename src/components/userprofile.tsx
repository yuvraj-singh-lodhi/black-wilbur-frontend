import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext"; // Adjust the import according to your file structure
import { Order, AccountDetails, CurrentUserDetails } from "../types"; // Adjust the import based on your project structure
import { fetchUserDetails, logoutUser } from "../services/api"; // Importing from api.tsx
import { useAuth  } from '../contexts/AuthContext'; // Import UserContext

const MyAccount: React.FC = () => {
  const { user, setUser } = useUserContext(); // Access user from context
  const {userauth } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(null);
  const [currentUserDetails, setCurrentUserDetails] = useState<CurrentUserDetails | null>(null);
  const [error, setError] = useState<string | null>(null); // Error state
  const navigate = useNavigate();

  // Fetch data from API on component mount
  useEffect(() => {
    if (userauth && userauth.id) {
      console.log(userauth)
      const fetchData = async () => {
        try {
          // Fetch user details using optional chaining to avoid crashes
          const currentUserDetails = await fetchUserDetails(userauth.id);
  
          console.log("Fetched currentUserDetails:", currentUserDetails); // Check the fetched data
  
          // Set the current user details
          setCurrentUserDetails(currentUserDetails);
  
          // Set orders or default to an empty array if no orders are available
          setOrders(currentUserDetails?.orders || []);
  
          // Set account details if the user object is available
          setAccountDetails({
            customerName: currentUserDetails?.user?.first_name || "",
            email: currentUserDetails?.user?.email || "",
            addresses: currentUserDetails?.addresses ? [currentUserDetails.addresses[0]] : [], // Ensure it's an array
            country: currentUserDetails?.addresses?.[0]?.country || "", // Set country if address is available
          });
          
  
        } catch (err) {
          console.error("Error fetching user details:", err);
          setError("An error occurred while fetching data.");
        }
      };
  
      fetchData();
    } else {
      console.warn("User or user data is undefined");
    }
  }, [userauth]);
  
  // Handle logout
  const handleLogout = () => {
    logoutUser()
    // localStorage.removeItem("token");
    setUser(null);
    navigate("/login"); // Change to your actual login/signup route
  };

  return (
    <div className="min-h-screen lg:pt-24 px-8 bg-white text-black font-montserrat">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center border-b pb-6">
          <h1 className="text-4xl font-bold">My Account</h1>
          <button
            className="px-4 py-2 border border-black rounded-full hover:bg-gray-200"
            onClick={handleLogout}
          >
            LOG OUT
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>} {/* Display error if any */}

        <div className="grid grid-cols-2 gap-8 mt-8">
          {/* Left side - Orders */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Orders</h2>
            {orders.length > 0 ? (
              <ul>
                {orders.map((order) => (
                  <li key={order.id} className="mb-4 border p-4 rounded">
                    <div className="font-bold">Order ID: {order.id}</div>
                    <div>Status: {order.status}</div>
                    <div>Created At: {new Date(order.created_at).toLocaleDateString()}</div>
                    <div>
                      <h3 className="font-semibold">Items:</h3>
                      <ul>
                        {order.items.map((item) => (
                          <li key={item.id}>
                            Product ID: {item.product_id}, Quantity: {item.quantity}, Size: {item.size}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>You haven't placed any orders yet.</p>
            )}
          </div>

          {/* Right side - Account Details */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Account Details</h2>
            {accountDetails ? (
              <>
                <p>Name: {accountDetails.customerName}</p>
                <p>Country: {accountDetails.country}</p>
                <a
                  onClick={() => navigate("/ViewAddresses")} // Ensure routing is set up
                  className="text-blue-500 hover:underline mt-2 inline-block"
                >
                  View Addresses ({accountDetails.addresses.length || 0})
                </a>
                <ul className="mt-2">
                  {Array.isArray(accountDetails.addresses) && accountDetails.addresses.length > 0 ? (
                    accountDetails.addresses.map((address, index) => (
                      <li key={index} className="text-gray-700">
                        {address.address_line_1}, {address.city}, {address.state}, {address.zip_code}
                      </li>
                    ))
                  ) : ( 
                    <p>No addresses found.</p>
                  )}
                </ul>
              </>
            ) : (
              <p>Loading account details...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
