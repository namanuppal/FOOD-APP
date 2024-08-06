import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { profile } from "../../redux/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth?.data);

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  return (
    <div className="max-w-2xl mx-auto my-12 p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-6">
        <img
          src={userData?.avatar?.secure_url}
          alt="user profile image"
          className="w-32 h-32 object-cover rounded-full border-4 border-gray-200"
        />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
        {userData.fullName}
      </h3>
      <div className="mb-6">
        <p className="font-semibold text-gray-700">Email:</p>
        <p className="text-gray-600">{userData?.email}</p>
        <p className="font-semibold text-gray-700 mt-2">Role:</p>
        <p className="text-gray-600">{userData?.role}</p>
      </div>
      <div className="flex space-x-4 justify-center">
        <Link
          to={
            userData?.email === "test@gmail.com"
              ? "/denied"
              : "/changepassword"
          }
        >
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300">
            Change Password
          </button>
        </Link>
        <Link
          to={
            userData?.email === "test@gmail.com"
              ? "/denied"
              : "/user/editprofile"
          }
        >
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-300">
            Edit Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
