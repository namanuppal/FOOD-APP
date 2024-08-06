import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { profile, updateProfile } from "../../redux/authSlice.js";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewImage, setImagePreview] = useState(""); // This should be used in the component

  const userId = useSelector((state) => state?.auth?.data?._id); // Extract userID from the selector
  const [data, setData] = useState({
    fullName: "",
    avatar: undefined,
  });

  const handleImageUpload = (e) => {
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.onload = () => {
        setImagePreview(fileReader.result); // Set the preview image state
        setData({
          ...data,
          avatar: uploadedImage,
        });
      };
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (!data.fullName || !data.avatar) {
      toast.error("All Fields are mandatory!");
      return;
    }

    if (data.fullName.length < 5) {
      toast.error("Name should be greater than 5 characters");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("avatar", data.avatar);
      await dispatch(updateProfile({ id: userId, data: formData }));
      await dispatch(profile());
      navigate("/user/profile");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <form
        onSubmit={onFormSubmit}
        className="flex flex-col justify-center gap-5 rounded-lg p-4 w-80 h-[26rem] shadow-[0_0_10px_black]"
      >
        <h1 className="text-center text-2xl font-bold">Edit Profile</h1>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={data.fullName}
          onChange={handleInputChange}
          className="p-2 border rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="p-2 border rounded"
        />

        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="w-24 h-24 rounded-full mx-auto"
          />
        )}

        <button
          type="submit"
          className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
