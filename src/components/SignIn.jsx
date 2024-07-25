import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "https://api-production-9183.up.railway.app/auth/signin";
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        credentials: "include", // If needed
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An error occurred");
      }
  
      const result = await response.json();
      localStorage.setItem("token", result.token);
      setMessage("Sign in successful!");
      navigate("/"); // Redirect to homepage
      setError("");
    } catch (error) {
      console.error("Error during request:", error); // Log detailed error
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      setError(error.message);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>
        {message && <div className="mb-4 text-green-600">{message}</div>}
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded"
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded"
            type="submit"
          >
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center">
          Don't have an account?{" "}
          <a href="/signup">
            <button className="text-blue-500 hover:underline focus:outline-none">
              Sign Up
            </button>
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;