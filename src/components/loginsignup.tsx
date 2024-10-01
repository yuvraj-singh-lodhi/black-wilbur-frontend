import React, { useState } from "react";
import { registerUser, loginUser } from '../services/api'; // Import your API functions

const LoginSignup: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  // State to track form input values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "", // Add username for both login and signup
    email: "",    // Required only for signup
    password: "",
    password2: "", // Add password2 for signup
  });

  // State to track errors
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    password2: "", // Add password2 for confirmation
  });

  // Separate states for login and forgot password errors
  const [loginErrors] = useState({
    email: "", // Change from email to username
    password: "",
  });

  const [forgotPasswordErrors, setForgotPasswordErrors] = useState({
    email: "",
  });

  const [apiError, setApiError] = useState(""); // API error state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value, // This line is correctly using the id to update the state
    }));
  };
  

  // Handle form submission for signup
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    setSuccessMessage("");
  
    // Perform basic validation for required fields
    const newErrors = {
      firstName: formData.firstName ? "" : "First Name is required",
      lastName: formData.lastName ? "" : "Last Name is required",
      email: formData.email ? "" : "Email is required",
      username: formData.username ? "" : "Username is required", // Include username validation
      password: formData.password ? "" : "Password is required",
      password2: formData.password2 ? "" : "Please confirm your password",
    };
  
    setErrors(newErrors);
  
    // Check if there are no errors before proceeding
    if (!Object.values(newErrors).some((error) => error)) {
      setLoading(true); // Start loading spinner or disable button
      try {
        // Register the user by passing the correct data
        const response = await registerUser({
          username: formData.username,   // Include username
          password: formData.password,
          password2: formData.password2, // Send password confirmation
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
        });
        
        // Handle success response
        console.log("Signup successful:", response);
        setSuccessMessage("Account created successfully! Please log in.");
        setFormData({ firstName: "", lastName: "", email: "", username: "", password: "", password2: "" }); // Reset form
        setIsLogin(true); // Switch to login page or form
      } catch (error) {
        console.error("Signup error:", error);
        setApiError("Failed to create account. Please try again.");
      } finally {
        setLoading(false); // Stop loading spinner or enable button
      }
    }
  };
  

// Handle form submission for login
// Handle form submission for login
const handleLoginSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setApiError("");

  // Use identifier instead of email
  const credentials = {
    identifier: formData.email, // Change to identifier here
    password: formData.password,
  };

  try {
    const response = await loginUser(credentials);
    console.log("Login successful:", response);
    // Handle successful login (e.g., redirect or update state)
  } catch (error) {
    console.error("Login error:", error);
    setApiError("Invalid credentials. Please check your email and password.");
  }
};


  // Handle forgot password submission
  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotPasswordErrors({ email: "" });
    const newForgotPasswordErrors = {
      email: formData.email ? "" : "Email is required",
    };

    setForgotPasswordErrors(newForgotPasswordErrors);

    if (!Object.values(newForgotPasswordErrors).some((error) => error)) {
      console.log("Forgot password form submitted:", formData);
      // Implement forgot password logic here
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white font-montserrat">
      {/* Left Section */}
      <div className={`w-full md:w-1/2 flex items-center justify-center ${isLogin ? "text-4xl md:text-6xl font-thin text-black" : "text-4xl md:text-6xl font-thin text-black"} ${isLogin ? "mt-16 md:mt-0" : ""}`}>
        <div className={`text-center ${isLogin ? "mt-36 md:mt-0" : "hidden md:block"}`}>
          {isLogin ? <span>Customer Login</span> : <> <span>Create an</span> <br /> <span>Account</span> </>}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {apiError && <p className="text-red-500 text-sm text-center">{apiError}</p>}
          {successMessage && <p className="text-green-500 text-sm text-center">{successMessage}</p>}
          {isLogin ? (
            forgotPassword ? (
              <form onSubmit={handleForgotPasswordSubmit} className="text-center space-y-6 mt-16 md:mt-0">
                <div className="mb-6">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`block w-full h-12 p-4 border ${forgotPasswordErrors.email ? "border-red-500" : "border-black"} text-black placeholder-gray-500 focus:outline-none focus:border-black text-sm`}
                    placeholder="Email"
                    required
                  />
                  {forgotPasswordErrors.email && (
                    <p className="text-red-500 text-sm">{forgotPasswordErrors.email}</p>
                  )}
                </div>
                <div className="flex flex-col items-center space-y-4">
                  <button
                    type="submit"
                    className="w-44 bg-black text-white py-2 px-4 rounded-3xl hover:bg-gray-800"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
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
              <form onSubmit={handleLoginSubmit} className="space-y-6 mt-16 md:mt-0">
                <div className="mb-6">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`block w-full h-12 p-4 border ${loginErrors.email ? "border-red-500" : "border-black"} text-black placeholder-gray-500 focus:outline-none focus:border-black text-sm`}
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
                    className={`block w-full h-12 p-4 border ${loginErrors.password ? "border-red-500" : "border-black"} text-black placeholder-gray-500 focus:outline-none focus:border-black text-sm`}
                    placeholder="Password"
                    required
                  />
                  {loginErrors.password && (
                    <p className="text-red-500 text-sm">{loginErrors.password}</p>
                  )}
                </div>
                <div className="flex flex-col items-center space-y-4">
                  <button
                    type="submit"
                    className="w-44 bg-black text-white py-2 px-4 rounded-3xl hover:bg-gray-800"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setForgotPassword(true)}
                    className="text-black hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              </form>
            )
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-6 mt-16 md:mt-0">
              <div className="mb-6">
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`block w-full h-12 p-4 border ${errors.firstName ? "border-red-500" : "border-black"} text-black placeholder-gray-500 focus:outline-none focus:border-black text-sm`}
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
                  className={`block w-full h-12 p-4 border ${errors.lastName ? "border-red-500" : "border-black"} text-black placeholder-gray-500 focus:outline-none focus:border-black text-sm`}
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
                  className={`block w-full h-12 p-4 border ${errors.email ? "border-red-500" : "border-black"} text-black placeholder-gray-500 focus:outline-none focus:border-black text-sm`}
                  placeholder="Email"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`block w-full h-12 p-4 border ${errors.username ? "border-red-500" : "border-black"} text-black placeholder-gray-500 focus:outline-none focus:border-black text-sm`}
                  placeholder="Username"
                  required
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">{errors.username}</p>
                )}
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full h-12 p-4 border ${errors.password ? "border-red-500" : "border-black"} text-black placeholder-gray-500 focus:outline-none focus:border-black text-sm`}
                  placeholder="Password"
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  id="password2"
                  value={formData.password2}
                  onChange={handleInputChange}
                  className={`block w-full h-12 p-4 border ${errors.password2 ? "border-red-500" : "border-black"} text-black placeholder-gray-500 focus:outline-none focus:border-black text-sm`}
                  placeholder="Confirm Password"
                  required
                />
                {errors.password2 && (
                  <p className="text-red-500 text-sm">{errors.password2}</p>
                )}
              </div>
              <div className="flex flex-col items-center space-y-4">
                <button
                  type="submit"
                  className="w-44 bg-black text-white py-2 px-4 rounded-3xl hover:bg-gray-800"
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </div>
            </form>
          )}

          {/* Toggle between Login and Signup */}
          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)} // Toggle login/signup mode
              className="text-black hover:underline"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
