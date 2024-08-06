import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login } from "../redux/authSlice";
import {useDispatch} from 'react-redux'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleUserInput = (e) =>{
    const {name, value} = e.target;
    setLoginData({
        ...loginData,
        [name]: value
    })
  }

  const onLogin = async (e) => {
    e.preventDefault();
    
    if (
        !loginData.email ||
        !loginData.password
      ) {
        toast.error("Please enter your valid Email and Password")
      }

    // calling create account action
    const res = await dispatch(login(loginData));

    // redirect to home page if true
    if (res.payload.success) navigate("/");

    // clearing the signup inputs
    setLoginData({
      email: "",
      password: "",
    });

  };
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <form noValidate
        onSubmit={onLogin}
        className="flex flex-col justify-center gap-3 rounded-lg p-4 w-96 shadow-[0_0_10px_black]"
      >
        <h1 className="text-center text-2xl font-bold">Login Page</h1>
        {/* input for email */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold" htmlFor="email">
            Email
          </label>
          <input
            required
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="bg-transparent px-2 py-1 border"
            value={loginData.email}
            onChange={handleUserInput}
          />
        </div>

        {/* input for password */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold" htmlFor="password">
            Password
          </label>
          <input
            required
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className="bg-transparent px-2 py-1 border"
            value={loginData.password}
            onChange={handleUserInput}
          />
        </div>

        {/* login button */}
        <button
          className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
          type="submit"
        >
          Login
        </button>

        <p className="text-center">
          Don't have an account ?{" "}
          <Link to={"/signup"} className="link text-accent cursor-pointer">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
