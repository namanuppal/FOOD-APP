import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from '../utils/axiosInstance.js';

// Helper function to safely get and parse localStorage data
const getItemOrDefault = (key, defaultValue) => {
    try {
      const item = localStorage.getItem(key);
      if (item === 'undefined' || item === null) {
        return defaultValue;
      }
      return JSON.parse(item);
    } catch (error) {
      console.error(`Failed to parse ${key} from localStorage:`, error);
      return defaultValue;
    }
  };  

const initialState = {
  isLoggedIn: getItemOrDefault("isLoggedIn", false),
  data: getItemOrDefault("data", {}),
  role: getItemOrDefault("role", ""),
};

// Function to register
export const createAccount = createAsyncThunk('/auth/signup', async (data) => {
  try {
    const res = await axiosInstance.post('/user/register', data);

    await toast.promise(res, {
      loading: "Loading...",
      success: (data) => data?.data?.message,
      error: "Failed to create account!"
    });

    return res.data;
  } catch (error) {
    toast.error(error.message);
  }
});

// Function to login
export const login = createAsyncThunk('/auth/login', async (data) => {
  try {
    const res = await axiosInstance.post('/user/login', data);

    await toast.promise(res, {
      loading: "Loading...",
      success: (data) => data?.data?.message,
      error: "Failed to login your account!"
    });

    return res.data;
  } catch (error) {
    toast.error(error.message);
  }
});

// Function to logout
export const logout = createAsyncThunk('/auth/logout', async () => {
  try {
    const res = await axiosInstance.post('/user/logout');

    await toast.promise(res, {
      loading: "Loading...",
      success: (data) => data?.data?.message,
      error: "Failed to logout your account!"
    });

    return res.data;
  } catch (error) {
    toast.error(error.message);
  }
});

// Function to get user data
export const getUserData = createAsyncThunk("/user/details", async () => {
    try {
      const res = await axiosInstance.get("/user/me");
      return res?.data;
    } catch (error) {
      toast.error(error.message);
    }
  });
  

// Function to change password
export const changePassword = createAsyncThunk('/auth/changePassword', async (userPassword) => {
  try {
    const res = await axiosInstance.post('/user/change-password', userPassword);

    await toast.promise(res, {
      loading: "Loading...",
      success: (data) => data?.data?.message,
      error: "Failed to change password!"
    });

    return res.data;
  } catch (error) {
    toast.error(error.message);
  }
});

// Function to forget password
export const forgetPassword = createAsyncThunk('/auth/forgetPassword', async (email) => {
  try {
    const res = await axiosInstance.post("/user/reset", { email });

    await toast.promise(res, {
      loading: "Loading...",
      success: (data) => data?.data?.message,
      error: "Failed to send verification mail!",
    });

    return res.data;
  } catch (error) {
    toast.error(error.message);
  }
});

// Function to update profile
export const updateProfile = createAsyncThunk('/user/update/profile', async (data) => {
  try {
    const res = await axiosInstance.put(`/user/update/${data[0]}`, data[1]);

    await toast.promise(res, {
      loading: "Loading...",
      success: (data) => data?.data?.message,
      error: "Failed to update profile!"
    });

    return res.data;
  } catch (error) {
    toast.error(error.message);
  }
});

// Function to reset password
export const resetPassword = createAsyncThunk('/auth/reset', async (data) => {
  try {
    const res = await axiosInstance.post(`/user/reset/${data.resetToken}`, {
      password: data.password,
    });

    await toast.promise(res, {
      loading: "Reset Loading...",
      success: (data) => data?.data?.message,
      error: "Failed to reset password!"
    });

    return res.data;
  } catch (error) {
    toast.error(error.message);
  }
});

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.fulfilled, (state, action) => {
        // Handle account creation
      })
      .addCase(login.fulfilled, (state, action) => {
        // Handle login
        localStorage.setItem("data", JSON.stringify(action?.payload?.user || {}));
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        localStorage.setItem("role", JSON.stringify(action?.payload?.user?.role || ""));
        state.isLoggedIn = true;
        state.data = action?.payload?.user || {};
        state.role = action?.payload?.user?.role || "";
      })
      .addCase(logout.fulfilled, (state) => {
        // Handle logout
        localStorage.removeItem("data");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("role");
        state.isLoggedIn = false;
        state.data = {};
        state.role = "";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })     
      .addCase(changePassword.fulfilled, (state) => {
        // Handle password change
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        // Handle forget password
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        // Handle profile update
        state.data = action?.payload || {};
      })
      .addCase(resetPassword.fulfilled, (state) => {
        // Handle password reset
      });
  }
});

export const {} = authSlice.actions;
export default authSlice.reducer;
