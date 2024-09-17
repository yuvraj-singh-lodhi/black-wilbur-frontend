import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import tshirt from "../assets/blackT.png";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  pinCode: string;
  phone: string;
  shippingMethod: string;
  paymentMethod: string;
  saveInfo: boolean;
  emailOffers?: boolean;
}

const Checkout: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    console.log("Submitted data:", data);
    navigate('/payment');
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col font-montserrat">
      {/* Main Content Wrapper */}
      <div className="flex-1 pt-[160px] pb-16 px-4 lg:px-8">
        <div className="max-w-6xl mx-auto p-6 bg-white text-black rounded-lg shadow-lg flex flex-col lg:flex-row">
          {/* Left side - Billing Details */}
          <div className="w-full lg:w-1/2 lg:pr-8 border-b lg:border-b-0 lg:border-r border-gray-300">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
                  <div className="w-full sm:w-1/2">
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <input
                      id="email"
                      type="email"
                      {...register('email', { required: 'Email is required' })}
                      className="mt-1 p-2 border border-gray-700 rounded-md w-full bg-gray-100 text-black"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    <div className="mt-2 flex items-center">
                      <input
                        id="emailOffers"
                        type="checkbox"
                        {...register('emailOffers')}
                        className="mr-2"
                      />
                      <label htmlFor="emailOffers" className="text-sm">Email me with news and offers</label>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label htmlFor="contact" className="block text-sm font-medium">Contact</label>
                    <input
                      id="contact"
                      type="text"
                      {...register('phone', { required: 'Phone is required' })}
                      className="mt-1 p-2 border border-gray-700 rounded-md w-full bg-gray-100 text-black"
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium">Address</label>
                  <input
                    id="address"
                    type="text"
                    {...register('address', { required: 'Address is required' })}
                    className="mt-1 p-2 border border-gray-700 rounded-md w-full bg-gray-100 text-black"
                  />
                  {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                </div>
                <div>
                  <label htmlFor="apartment" className="block text-sm font-medium">Apartment, suite, etc. (optional)</label>
                  <input
                    id="apartment"
                    type="text"
                    {...register('apartment')}
                    className="mt-1 p-2 border border-gray-700 rounded-md w-full bg-gray-100 text-black"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium">City</label>
                  <input
                    id="city"
                    type="text"
                    {...register('city', { required: 'City is required' })}
                    className="mt-1 p-2 border border-gray-700 rounded-md w-full bg-gray-100 text-black"
                  />
                  {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                </div>
                <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
                  <div className="w-full sm:w-1/3">
                    <label htmlFor="state" className="block text-sm font-medium">State</label>
                    <input
                      id="state"
                      type="text"
                      {...register('state', { required: 'State is required' })}
                      className="mt-1 p-2 border border-gray-700 rounded-md w-full bg-gray-100 text-black"
                    />
                    {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                  </div>
                  <div className="w-full sm:w-1/3">
                    <label htmlFor="pinCode" className="block text-sm font-medium">PIN Code</label>
                    <input
                      id="pinCode"
                      type="text"
                      {...register('pinCode', { required: 'PIN Code is required' })}
                      className="mt-1 p-2 border border-gray-700 rounded-md w-full bg-gray-100 text-black"
                    />
                    {errors.pinCode && <p className="text-red-500 text-sm">{errors.pinCode.message}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="shippingMethod" className="block text-sm font-medium">Shipping Method</label>
                  <input
                    id="shippingMethod"
                    type="text"
                    {...register('shippingMethod')}
                    className="mt-1 p-2 border border-gray-700 rounded-md w-full bg-gray-100 text-black"
                    placeholder="Enter your shipping address to view available shipping methods."
                  />
                </div>
                <div>
                  <label htmlFor="paymentMethod" className="block text-sm font-medium">Choose a Payment Method</label>
                  <select
                    id="paymentMethod"
                    {...register('paymentMethod', { required: 'Payment method is required' })}
                    className="mt-1 p-2 border border-gray-700 rounded-md w-full bg-gray-100 text-black"
                  >
                    <option value="">Select Payment Method</option>
                    <option value="razorpay">Razorpay</option>
                    <option value="phonepe">PhonePe</option>
                  </select>
                  {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod.message}</p>}
                  <div className="mt-2 flex items-center">
                    <input
                      id="saveInfo"
                      type="checkbox"
                      {...register('saveInfo')}
                      className="mr-2"
                    />
                    <label htmlFor="saveInfo" className="text-sm">Save my information for a faster checkout</label>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 w-full sm:w-auto"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
          
          {/* Right side - Order Summary */}
          <div className="w-full lg:w-1/2 lg:pl-8 mt-6 lg:mt-0">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <img src={tshirt} alt="Product" className="w-24 h-24 object-cover rounded-md" />
                <div className="ml-4">
                  <p className="font-bold">Blvck x UNO Hoodie</p>
                  <p className="text-sm">Size: XS</p>
                  <p className="text-sm">1 x ₹12,000.00</p>
                </div>
              </div>
              <div className="flex justify-between mb-4">
                <span>Subtotal (1 item)</span>
                <span>₹12,000.00</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Shipping</span>
                <span>Enter shipping address</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹12,000.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
