import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomSuccessModal from "./CustomSuccessModal";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData({ ...formData, [id]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "https://api-production-9183.up.railway.app/auth/signup";
  
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      if (formData.avatar) {
        data.append("avatar", formData.avatar);
      }
  
      const response = await fetch(url, {
        method: "POST",
        body: data,
        credentials: "include",
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An error occurred");
      }
  
      setMessage("Sign up successful! Redirecting to sign in...");
      setShowModal(true);
      setError("");
      setTimeout(() => {
        setShowModal(false);
        navigate("/signin");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Error during request:", error);
      setError(error.message);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        {message && <div className="mb-4 text-green-600">{message}</div>}
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded"
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
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
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="avatar">
              Avatar
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded"
              type="file"
              id="avatar"
              onChange={handleChange}
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center">
          Already have an account?{" "}
          <a href="/signin">
            <button
              className="text-blue-500 hover:underline focus:outline-none"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </button>
          </a>
        </p>
      </div>
      <CustomSuccessModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default SignUp;
