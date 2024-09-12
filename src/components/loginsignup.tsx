// LoginSignup.tsx
import React, { useState } from 'react';

const LoginSignup: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white font-montserrat">
      {/* Left Section */}
      <div className={`w-full md:w-1/2 flex items-center justify-center h-1/2 md:h-full ${isLogin ? 'text-4xl md:text-6xl font-thin text-black' : 'text-4xl md:text-6xl font-thin text-black'}`}>
        {isLogin ? (
          <div className="text-center">
            <span>Customer Login</span>
          </div>
        ) : (
          <div className="text-center">
            <span>Create an</span><br />
            <span>Account</span>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center h-1/2 md:h-full px-4">
        {isLogin ? (
          <form className="w-full max-w-md">
            {forgotPassword ? (
              <div className="text-center">
                <div className="mb-6">
                  <input 
                    type="email" 
                    id="email" 
                    className="block w-full h-12 p-4 border border-black text-black placeholder-gray-500 focus:outline-none focus:border-black text-sm" 
                    placeholder="Email" 
                    required 
                  />
                </div>
                <div className="flex justify-between items-center">
                  <button type="submit" className="w-44 bg-black text-white py-2 px-4 rounded-3xl hover:bg-gray-800">Submit</button>
                  <div className="text-center">
                    <button type="button" onClick={() => setForgotPassword(false)} className="text-black hover:underline">Back to Login</button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <input 
                    type="email" 
                    id="email" 
                    className="block w-full h-12 p-4 border border-black text-black placeholder-gray-500 focus:outline-none focus:border-black text-sm" 
                    placeholder="Email" 
                    required 
                  />
                </div>
                <div className="mb-6">
                  <input 
                    type="password" 
                    id="password" 
                    className="block w-full h-12 p-4 border border-black text-black placeholder-gray-500 focus:outline-none focus:border-black text-sm" 
                    placeholder="Password" 
                    required 
                  />
                </div>
                <div className="flex justify-between text-center">
                  <div className="flex flex-col justify-between">
                    <button type="submit" className="w-44 bg-black text-white py-2 px-4 rounded-3xl hover:bg-gray-800">Login</button>
                    <button type="button" onClick={() => setForgotPassword(true)} className="text-black hover:underline">Forgot Password?</button>
                  </div>
                  <div className="mt-4 text-center">
                    <button type="button" onClick={() => setIsLogin(false)} className="text-black hover:underline mt-2 block">Create an account</button>
                  </div>
                </div>
              </div>
            )}
          </form>
        ) : (
          <form className="w-full max-w-md">
            <div className="mb-6">
              <input 
                type="text" 
                id="firstName" 
                className="block w-full h-12 p-4 border border-black text-black placeholder-gray-500 focus:outline-none focus:border-black text-sm" 
                placeholder="First Name" 
                required 
              />
            </div>
            <div className="mb-6">
              <input 
                type="text" 
                id="lastName" 
                className="block w-full h-12 p-4 border border-black text-black placeholder-gray-500 focus:outline-none focus:border-black text-sm" 
                placeholder="Last Name" 
                required 
              />
            </div>
            <div className="mb-6">
              <input 
                type="email" 
                id="email" 
                className="block w-full h-12 p-4 border border-black text-black placeholder-gray-500 focus:outline-none focus:border-black text-sm" 
                placeholder="Email" 
                required 
              />
            </div>
            <div className="mb-6">
              <input 
                type="password" 
                id="password" 
                className="block w-full h-12 p-4 border border-black text-black placeholder-gray-500 focus:outline-none focus:border-black text-sm" 
                placeholder="Password" 
                required 
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <button type="submit" className="bg-black text-white py-2 px-4 rounded-3xl hover:bg-gray-800 w-full">Create Account</button>
              <button type="button" onClick={() => setIsLogin(true)} className="bg-white text-black py-2 px-4 border border-black rounded-3xl hover:bg-gray-100 w-full">Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
