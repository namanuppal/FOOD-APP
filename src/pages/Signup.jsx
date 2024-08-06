import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { createAccount } from "../redux/authSlice";
import toast, { Toaster } from "react-hot-toast"; // Import toast

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error); // Redux se error state retrieve karna

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: null,
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSignupData({
        ...signupData,
        avatar: file,
      });
    }
  };

  const handleImageClick = () => {
    document.getElementById("avatarInput").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, password, avatar } = signupData;

    if (!fullName || !email || !password) {
      toast.error("All fields are required!"); // Show error toast
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      if (avatar) {
        formData.append("avatar", avatar);
      }

      const resultAction = await dispatch(createAccount(formData));

      if (createAccount.fulfilled.match(resultAction)) {
        // Registration successful
        toast.success("Account created successfully!"); // Show success toast
        navigate("/login"); // Redirect to signin page
      } else if (createAccount.rejected.match(resultAction)) {
        // Error occurred during registration
        toast.error(resultAction.payload || "Failed to create account"); // Show error toast
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("An unexpected error occurred"); // Show error toast
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-orange-100">
      <Toaster /> {/* Add the Toaster component for toast notifications */}
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <div className="flex justify-center mb-4 text-orange-500">
          <div
            className="relative cursor-pointer"
            onClick={handleImageClick}
            title="Click to upload a profile picture"
          >
            {signupData.avatar ? (
              <img
                src={URL.createObjectURL(signupData.avatar)}
                alt="Avatar Preview"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <BsPersonCircle size={96} />
            )}
          </div>
          <input
            type="file"
            id="avatarInput"
            name="avatar"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={signupData.fullName}
              onChange={handleUserInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={signupData.email}
              onChange={handleUserInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email address"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={signupData.password}
              onChange={handleUserInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 font-bold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
