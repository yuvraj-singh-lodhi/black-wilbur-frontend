import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { registerUser, loginUser, fetchCurrentUser } from '../services/api'; // Import your API functions
import { useAuth  } from '../contexts/AuthContext'; // Import UserContext

const LoginSignup: React.FC = () => {
  // const {user, setUser } = useUserContext(); // Access the setUser function from context
  const {setUser } = useAuth(); // Access setUser from AuthContext
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  // State to track form input values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "", 
    email: "",  
    password: "",
    password2: "", 
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

  const [loginErrors] = useState({
    username: "", // Changed from email to username
    password: "",
  });

  const [forgotPasswordErrors, setForgotPasswordErrors] = useState({
    email: "",
  });

  const [apiError, setApiError] = useState(""); // API error state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  // Initialize useNavigate
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
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
      username: formData.username ? "" : "Username is required",
      password: formData.password ? "" : "Password is required",
      password2: formData.password2 ? "" : "Please confirm your password",
    };

    setErrors(newErrors);

    // Check if there are no errors before proceeding
    if (!Object.values(newErrors).some((error) => error)) {
      setLoading(true);
      try {
        const response = await registerUser({
          username: formData.username,
          password: formData.password,
          password2: formData.password2,
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
        });

        console.log("Signup successful:", response);
        setSuccessMessage("Account created successfully! Please log in.");
        setFormData({ firstName: "", lastName: "", email: "", username: "", password: "", password2: "" });
        setIsLogin(true);
      } catch (error) {
        console.error("Signup error:", error);
        setApiError("Failed to create account. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle form submission for login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    const credentials = {
      identifier: formData.username, // Use username instead of email
      password: formData.password,
    };

    try {
      const response = await loginUser(credentials);
      console.log("Login successful:", response);
      
      // Check if login was successful
      if (response && response.token) {
        // Fetch user details after successful login
        const userDetails = await fetchCurrentUser(); // Pass token if needed
        console.log("Fetched user details:", userDetails);
        
        // Set user context
        setUser(userDetails);
        // Store token in local storage
        localStorage.setItem("token", response.token);

        // Navigate to UserProfile after successful login
        navigate('/UserProfile'); // Change this to your actual route for UserProfile
      }
    } catch (error) {
      console.error("Login error:", error);
      setApiError("Invalid credentials. Please check your username and password.");
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
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`block w-full h-12 p-4 border ${loginErrors.username ? "border-red-500" : "border-black"} text-black placeholder-gray-500 focus:outline-none focus:border-black text-sm`}
                    placeholder="Username"
                    required
                  />
                  {loginErrors.username && (
                    <p className="text-red-500 text-sm">{loginErrors.username}</p>
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
                    {loading ? "Logging in..." : "Log In"}
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
              {/* Signup form fields */}
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
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
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
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
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
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
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
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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
                {errors.password2 && <p className="text-red-500 text-sm">{errors.password2}</p>}
              </div>
              <div className="flex flex-col items-center space-y-4">
                <button
                  type="submit"
                  className="w-44 bg-black text-white py-2 px-4 rounded-3xl hover:bg-gray-800"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Create Account"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-black hover:underline"
                >
                  Already have an account? Log in
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
