import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useUserContext } from "../contexts/UserContext"; // Import the context

const ViewAddresses: React.FC = () => {
  const { user, setUser } = useUserContext(); // Get user and setUser from UserContext
  const [newAddress, setNewAddress] = useState<string>("");
  const navigate = useNavigate(); // Initialize navigate

  // Add a new address
  const handleAddAddress = () => {
    if (newAddress.trim() !== "" && user) {
      const updatedAddresses = [
        ...user.addresses,
        { address_line_1: newAddress },
      ];
      setUser({ ...user, addresses: updatedAddresses }); // Update the user context
      setNewAddress("");
    }
  };

  // Handle deleting an address
  const handleDeleteAddress = (index: number) => {
    if (user) {
      const updatedAddresses = user.addresses.filter((_, i) => i !== index);
      setUser({ ...user, addresses: updatedAddresses }); // Update the user context
    }
  };

  // Handle editing an address
  const handleEditAddress = (index: number, updatedAddress: string) => {
    if (user) {
      const updatedAddresses = [...user.addresses];
      updatedAddresses[index].address_line_1 = updatedAddress; // Update the address
      setUser({ ...user, addresses: updatedAddresses }); // Update the user context
    }
  };

  return (
    <div className="min-h-screen lg:pt-24 px-8 bg-white text-black font-montserrat">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Manage Addresses</h1>
          <button
            className="px-4 py-2 border border-black rounded-full hover:bg-gray-200"
            onClick={() => navigate(-1)} // Go back to the previous page
          >
            Back
          </button>
        </div>

        {/* Add New Address */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Add New Address</h2>
          <input
            type="text"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            className="border px-4 py-2 w-full"
            placeholder="Enter new address"
          />
          <button
            className="mt-4 px-4 py-2 border border-black rounded-full hover:bg-gray-200"
            onClick={handleAddAddress}
          >
            Add Address
          </button>
        </div>

        {/* List of Addresses */}
        <h2 className="text-2xl font-semibold mb-4">Your Addresses</h2>
        {user?.addresses.length > 0 ? (
          <ul>
            {user.addresses.map((address, index) => (
              <li key={index} className="mb-4">
                {/* Access individual fields of the address object */}
                <input
                  type="text"
                  value={address.address_line_1} // Display the specific field
                  onChange={(e) => handleEditAddress(index, e.target.value)}
                  className="border px-4 py-2 w-full"
                />
                <button
                  className="mt-2 px-4 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-100"
                  onClick={() => handleDeleteAddress(index)}
                >
                  Delete Address
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>You don't have any saved addresses.</p>
        )}
      </div>
    </div>
  );
};

export default ViewAddresses;
