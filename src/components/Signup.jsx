import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomSuccessModal from "./CustomSuccessModal"; // Optional: custom modal for success messages

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
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
    const url = "https://api-production-9110.up.railway.app/signup";

    setError(""); // Clear previous errors

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
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An error occurred");
      }

      setMessage("Sign up successful! Please check your email for verification.");
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate("/verify"); // Redirect to the verification page
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
              required
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
              required
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
              required
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
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        {showModal && <CustomSuccessModal message={message} />}
      </div>
    </div>
  );
}

export default SignUp;
