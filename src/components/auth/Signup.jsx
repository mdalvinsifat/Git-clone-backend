import React, { useState } from "react";
import Logo from "../../assets/github-mark-white.svg"
import "./auth.css"
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate()
const { setcurrentUser } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
        localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
       setcurrentUser(res.data.userId);
      console.log("Registration successful:", res.data);
      navigate("/")
    } catch (error) {
      console.log("Registration error:", error);
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img src={Logo} alt="GitHub Logo" className="h-12 w-12" />
        </div>
        
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-900 py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 border border-gray-700">
          {error && (
            <div className="mb-4 p-2 bg-red-900 border border-red-700 text-red-200 rounded text-sm">
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Full Name */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-1">
                Full name
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-800 text-white"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-800 text-white"
                placeholder="Enter your email address"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-800 text-white"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </div>
          </form>

          {/* Terms and Conditions */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              By creating an account, you agree to the{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300 hover:underline">
                Terms of Service
              </a>
              . For more information about GitHub's privacy practices, see the{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300 hover:underline">
                GitHub Privacy Statement
              </a>
              .
            </p>
          </div>
        </div>

        {/* Login Redirect */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <a href="/auth" className="font-medium text-blue-400 hover:text-blue-300 hover:underline">
              Sign in →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;