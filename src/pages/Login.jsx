import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice.js";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Function to handle user input
  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // Function to handle login
  const handleLogin = async (event) => {
    event.preventDefault();

    // Checking the empty fields
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      // Calling login action
      const res = await dispatch(login(loginData));

      // Redirect to home page if login is successful
      if (res?.payload?.success) {
        navigate("/");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      toast.error("An error occurred while logging in.");
    }

    // Clearing the login inputs
    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleLogin}
        className="flex flex-col justify-center gap-4 rounded-lg p-4 w-80 h-80 shadow-lg"
      >
        <h1 className="text-center text-2xl font-bold">Login Page</h1>
        <div className="flex flex-col gap-1">
          <label className="text-lg font-semibold" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="bg-transparent px-2 py-1 border"
            value={loginData.email}
            onChange={handleUserInput}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-lg font-semibold" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className="bg-transparent px-2 py-1 border"
            value={loginData.password}
            onChange={handleUserInput}
            required
          />
        </div>

        {/* Guest account access */}
        <div
          onClick={() =>
            setLoginData({ email: "test@gmail.com", password: "Test@123" })
          }
          className="text-center text-accent cursor-pointer"
        >
          Guest Login
        </div>

        <button
          className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg"
          type="submit"
        >
          Login
        </button>

        <Link to="/forgetpassword">
          <p className="text-center text-accent cursor-pointer">
            Forget Password
          </p>
        </Link>

        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-accent cursor-pointer">
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
