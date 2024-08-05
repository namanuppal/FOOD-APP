import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { changePassword } from "../../redux/authSlice.js";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userPassword, setUserPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  // function to handle input box change
  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setUserPassword({
      ...userPassword,
      [name]: value,
    });
  };

  // function to handle form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // checking the fields are empty or not
    if (!userPassword.oldPassword || !userPassword.newPassword) {
      toast.error("All fields are mandatory");
      return;
    }

    // validating the password using regex
    if (
      !userPassword.newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
    ) {
      toast.error(
        "Minimum password length should be 6 with Uppercase, Lowercase, Number and Symbol"
      );
      return;
    }

    // calling the api from auth slice
    const res = await dispatch(changePassword(userPassword));

    // clearing the input fields
    setUserPassword({
      oldPassword: "",
      newPassword: "",
    });

    // redirecting to profile page if password changed
    if (res.payload.success) navigate("/user/profile");
  };

  return (
    <div className="flex items-center justify-center h-[100vh] bg-gray-100">
      {/* Change Password Card */}
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col justify-center gap-6 rounded-lg p-6 text-white w-80 h-[26rem] shadow-lg bg-orange-500"
      >
        <h1 className="text-center text-2xl font-bold">Change Password</h1>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold" htmlFor="oldPassword">
            Old Password
          </label>
          <input
            required
            type="password"
            name="oldPassword"
            id="oldPassword"
            placeholder="Enter your old password"
            className="bg-white text-gray-800 px-2 py-1 border rounded"
            value={userPassword.oldPassword}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold" htmlFor="newPassword">
            New Password
          </label>
          <input
            required
            type="password"
            name="newPassword"
            id="newPassword"
            placeholder="Enter your new password"
            className="bg-white text-gray-800 px-2 py-1 border rounded"
            value={userPassword.newPassword}
            onChange={handlePasswordChange}
          />
        </div>

        <Link to={"/user/profile"}>
          <p className="text-yellow-300 cursor-pointer flex items-center justify-center w-full gap-2">
            <AiOutlineArrowLeft /> Back to Profile
          </p>
        </Link>

        <button
          className="w-full bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
          type="submit"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
