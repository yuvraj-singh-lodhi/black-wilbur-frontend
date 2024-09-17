// LoginSignup.tsx
import React, { useState } from "react";

const LoginSignup: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);

  // State to track form input values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // State to track errors
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // State to track errors for login and forgot password
  const [loginErrors, setLoginErrors] = useState({
    email: "",
    password: "",
  });

  const [forgotPasswordErrors, setForgotPasswordErrors] = useState({
    email: "",
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission for create account
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      firstName: formData.firstName ? "" : "First Name is required",
      lastName: formData.lastName ? "" : "Last Name is required",
      email: formData.email ? "" : "Email is required",
      password: formData.password ? "" : "Password is required",
    };

    setErrors(newErrors);

    // Check if there are no errors
    if (!Object.values(newErrors).some((error) => error)) {
      // Proceed with form submission (e.g., call an API)
      console.log("Signup form submitted:", formData);
    }
  };

  // Handle form submission for login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLoginErrors = {
      email: formData.email ? "" : "Email is required",
      password: formData.password ? "" : "Password is required",
    };

    setLoginErrors(newLoginErrors);

    // Check if there are no errors
    if (!Object.values(newLoginErrors).some((error) => error)) {
      // Proceed with form submission (e.g., call an API)
      console.log("Login form submitted:", formData);
    }
  };

  // Handle form submission for forgot password
  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newForgotPasswordErrors = {
      email: formData.email ? "" : "Email is required",
    };

    setForgotPasswordErrors(newForgotPasswordErrors);

    // Check if there are no errors
    if (!Object.values(newForgotPasswordErrors).some((error) => error)) {
      // Proceed with form submission (e.g., call an API)
      console.log("Forgot password form submitted:", formData);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white font-montserrat">
      {/* Left Section */}
      <div
        className={`w-full md:w-1/2 flex items-center justify-center ${
          isLogin
            ? "text-4xl md:text-6xl font-thin text-black"
            : "text-4xl md:text-6xl font-thin text-black"
        } ${isLogin ? "mt-16 md:mt-0" : ""}`}
      >
        {/* Center text for login or create account on small screens */}
        <div
          className={`text-center ${
            isLogin ? "mt-36 md:mt-0" : "hidden md:block"
          }`}
        >
          {isLogin ? (
            <span>Customer Login</span>
          ) : (
            <>
              <span>Create an</span>
              <br />
              <span>Account</span>
            </>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {isLogin ? (
            forgotPassword ? (
              <form
                onSubmit={handleForgotPasswordSubmit}
                className="text-center space-y-6 mt-16 md:mt-0"
              >
                <div className="mb-6">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`block w-full h-12 p-4 border ${
                      forgotPasswordErrors.email
                        ? "border-red-500"
                        : "border-black"
                    } text-black placeholder-gray-500 focus:outline-none focus:border-black text-sm`}
                    placeholder="Email"
                    required
                  />
                  {forgotPasswordErrors.email && (
                    <p className="text-red-500 text-sm">
                      {forgotPasswordErrors.email}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-center space-y-4">
                  <button
                    type="submit"
                    className="w-44 bg-black text-white py-2 px-4 rounded-3xl hover:bg-gray-800"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setForgotPassword(false)}
                    className="text-black hover:underline"
                  >
                    Back to Login
                  </button>
                </div>
              </form>
            ) : (
              <form
                onSubmit={handleLoginSubmit}
                className="space-y-6 mt-16 md:mt-0"
              >
                <div className="mb-6">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`block w-full h-12 p-4 border ${
                      loginErrors.email ? "border-red-500" : "border-black"
                    } text-black placeholder-gray-500 focus:outline-none focus:border-black text-sm`}
                    placeholder="Email"
                    required
                  />
                  {loginErrors.email && (
                    <p className="text-red-500 text-sm">{loginErrors.email}</p>
                  )}
                </div>
                <div className="mb-6">
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`block w-full h-12 p-4 border ${
                      loginErrors.password ? "border-red-500" : "border-black"
                    } text-black placeholder-gray-500 focus:outline-none focus:border-black text-sm`}
                    placeholder="Password"
                    required
                  />
                  {loginErrors.password && (
                    <p className="text-red-500 text-sm">
                      {loginErrors.password}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-center space-y-4">
                  <button
                    type="submit"
                    className="w-44 bg-black text-white py-2 px-4 rounded-3xl hover:bg-gray-800"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setForgotPassword(true)}
                    className="text-black hover:underline"
                  >
                    Forgot Password?
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className="text-black hover:underline mt-2"
                  >
                    Create an account
                  </button>
                </div>
              </form>
            )
          ) : (
            <form
              onSubmit={handleSignupSubmit}
              className="space-y-6 mt-40 md:mt-0"
            >
              <div className="mb-6">
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`block w-full h-12 p-4 border ${
                    errors.firstName ? "border-red-500" : "border-black"
                  } text-black placeholder-gray-500 focus:outline-none focus:border-black text-sm`}
                  placeholder="First Name"
                  required
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`block w-full h-12 p-4 border ${
                    errors.lastName ? "border-red-500" : "border-black"
                  } text-black placeholder-gray-500 focus:outline-none focus:border-black text-sm`}
                  placeholder="Last Name"
                  required
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
              <div className="mb-6">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`block w-full h-12 p-4 border ${
                    errors.email ? "border-red-500" : "border-black"
                  } text-black placeholder-gray-500 focus:outline-none focus:border-black text-sm`}
                  placeholder="Email"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full h-12 p-4 border ${
                    errors.password ? "border-red-500" : "border-black"
                  } text-black placeholder-gray-500 focus:outline-none focus:border-black text-sm`}
                  placeholder="Password"
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <button
                  type="submit"
                  className="bg-black text-white py-2 px-4 rounded-3xl hover:bg-gray-800 w-full"
                >
                  Create Account
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="bg-white text-black py-2 px-4 border border-black rounded-3xl hover:bg-gray-100 w-full"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
