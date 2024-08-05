import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createAccount } from "../redux/authSlice.js";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setImagePreview] = useState("");
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: null,
  });

  // function to set the signup data
  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setSignupData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // function to handle the image upload
  const getImage = (event) => {
    event.preventDefault();
    const uploadedImage = event.target.files[0];
    if (uploadedImage) {
      setSignupData((prevState) => ({
        ...prevState,
        avatar: uploadedImage,
      }));
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setImagePreview(fileReader.result);
      };
      fileReader.readAsDataURL(uploadedImage);
    }
  };

  // function to create account
  const createNewAccount = async (event) => {
    event.preventDefault();

    // Validate form data
    if (!signupData.avatar || !signupData.email || !signupData.fullName || !signupData.password) {
        toast.error("Please fill all the fields");
        return;
    }

    // Create FormData
    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    try {
        // Dispatch createAccount action
        const resultAction = await dispatch(createAccount(formData));

        if (createAccount.fulfilled.match(resultAction)) {
            navigate("/login");
        } else {
            toast.error(resultAction.payload || "Failed to create account.");
        }
    } catch (error) {
        toast.error("An error occurred while creating the account.");
    }

    // Clear form
    setSignupData({
        fullName: "",
        email: "",
        password: "",
        avatar: null,
    });
    setImagePreview("");
};

  

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={createNewAccount}
        className="flex flex-col justify-center gap-3 rounded-lg p-4 w-96 shadow-md"
      >
        <h1 className="text-center text-2xl font-bold">Registration Page</h1>
        <label className="cursor-pointer" htmlFor="image_uploads">
          {previewImage ? (
            <img
              className="w-24 h-24 rounded-full m-auto"
              src={previewImage}
              alt="preview"
            />
          ) : (
            <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
          )}
        </label>
        <input
          onChange={getImage}
          className="hidden"
          type="file"
          id="image_uploads"
          name="avatar"
          accept=".jpg, .jpeg, .png"
        />
        <div className="flex flex-col gap-1">
          <label className="font-semibold" htmlFor="fullName">Name</label>
          <input
            required
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Enter your name"
            className="bg-transparent px-2 py-1 border"
            value={signupData.fullName}
            onChange={handleUserInput}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold" htmlFor="email">Email</label>
          <input
            required
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="bg-transparent px-2 py-1 border"
            value={signupData.email}
            onChange={handleUserInput}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold" htmlFor="password">Password</label>
          <input
            required
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className="bg-transparent px-2 py-1 border"
            value={signupData.password}
            onChange={handleUserInput}
          />
        </div>
        <button
          className="w-full bg-orange-500 hover:bg-orange-400 transition-all ease-in-out duration-300 rounded-3xl py-2 font-semibold text-lg cursor-pointer"
          type="submit"
        >
          Create Account
        </button>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-accent cursor-pointer">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
