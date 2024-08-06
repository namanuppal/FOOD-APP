import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
import axios from "axios";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true", // Ensure boolean value
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data")) || {}, // Parse JSON string
  error: null, // Add error state
};

// Function for Registration
export const createAccount = createAsyncThunk(
  '/auth/signup',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        'https://api-production-f5b0.up.railway.app/api/v1/user/register',
        data
      );

      toast.success(res.data.message || "Account created successfully");

      return res.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to create account";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Function for Login
export const login = createAsyncThunk(
  '/auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        'https://api-production-f5b0.up.railway.app/api/v1/user/login',
        data
      );

      toast.success(res.data.message || "Logged in successfully");

      return res.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to login";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Function for Logout
export const logout = createAsyncThunk(
  '/auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        'https://api-production-f5b0.up.railway.app/api/v1/user/logout'
      );

      toast.success(res.data.message || "Logged out successfully");

      return res.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to log out";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Function for Email Verification
export const verifyEmail = createAsyncThunk(
  '/auth/verify',
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://api-production-f5b0.up.railway.app/api/v1/user/verify/${token}`
      );

      toast.success(res.data.message || "Email verified successfully");

      return res.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to verify email";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Function for Profile
export const profile = createAsyncThunk(
  '/auth/profile',
  async (_, { rejectWithValue }) => { // Remove email from parameters
    try {
      const res = await axios.get(
        'https://api-production-f5b0.up.railway.app/api/v1/user/me'
      );

      toast.success(res.data.message || "Your Profile is Here!");

      return res.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to fetch profile";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Function for Edit Profile
export const updateProfile = createAsyncThunk(
  '/auth/updateProfile',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `https://api-production-f5b0.up.railway.app/api/v1/user/update/${id}`, 
        data, 
        { headers: { 'Content-Type': 'multipart/form-data' } } // Ensure headers are set for multipart data
      );

      toast.success(res.data.message || "Profile updated successfully");

      return res.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to update profile";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", "true"); // Ensure value is a string
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", "true"); // Ensure value is a string
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.data = {};
        state.isLoggedIn = false;
        state.role = "";
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        // Handle successful email verification
        state.error = null; // Clear any previous error
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export default authSlice.reducer;
