import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserData, updateProfile } from "../../redux/authSlice.js";

const EditProfile = () => {
  const dispatch = useDispatch();
  const [previewImage, setImagePreview] = useState("");

  const [data, setData] = useState({
    fullName: "",
    avatar: undefined,
    userID: useSelector((state) => state?.auth?.data?._id),
  });

  // Function to handle the image upload
  const getImage = (event) => {
    event.preventDefault();
    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      setData({
        ...data,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setImagePreview(this.result);
      });
    }
  };

  // Function to set the name of user
  const setName = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  // Function to handle the form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!data.fullName || !data.avatar) {
      toast.error("All fields are mandatory");
      return;
    }

    if (data.fullName.length < 5) {
      toast.error("Name should have more than 5 characters");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar);

    const newUserData = [data.userID, formData];

    await dispatch(updateProfile(newUserData));
    await dispatch(getUserData());
  };

  return (
    <div className="flex items-center justify-center h-[100vh] bg-gray-100">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col justify-center gap-6 rounded-lg p-6 w-80 h-[30rem] shadow-lg bg-orange-500 text-white"
      >
        <h1 className="text-center text-2xl font-bold">Edit Profile</h1>

        {/* Input for image file */}
        <label className="cursor-pointer flex items-center justify-center mb-4">
          {previewImage ? (
            <img
              className="w-32 h-32 rounded-full border-4 border-white"
              src={previewImage}
              alt="preview image"
            />
          ) : (
            <BsPersonCircle className="w-32 h-32 text-white border-4 border-white rounded-full" />
          )}
          <input
            onChange={getImage}
            className="hidden"
            type="file"
            id="image_uploads"
            name="image_uploads"
            accept=".jpg, .jpeg, .png"
          />
        </label>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold" htmlFor="fullName">
            Full Name
          </label>
          <input
            required
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Enter your full name"
            className="bg-white text-gray-800 px-3 py-2 border rounded"
            value={data.fullName}
            onChange={setName}
          />
        </div>

        <Link to={"/user/profile"}>
          <p className="text-yellow-200 cursor-pointer flex items-center justify-center w-full gap-2">
            <AiOutlineArrowLeft /> Back to Profile
          </p>
        </Link>

        <button
          className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg"
          type="submit"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
