import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import toast from 'react-hot-toast'; // 

// Try loading user from localStorage on app start
const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: userFromStorage,
  isAuthenticated: !!userFromStorage,
  loading: false,
  error: null,
  otpPhase: false,
  userIdForOtp: null,
  otpError: null,
};

// ====== ASYNC THUNKS ======

// Async thunk: login
export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/login", credentials);
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// Async thunk: signup
export const signupUserThunk = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/signup", userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

// Async thunk: verify otp
export const verifyOtpThunk = createAsyncThunk(
  "auth/verifyOtp",
  async ({ userId, otp }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/verify-otp", { userId, otp });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

// Async thunk: resend otp
export const resendOtpThunk = createAsyncThunk(
  "auth/resendOtp",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/resend-otp", { userId });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to resend OTP"
      );
    }
  }
);

// Async thunk: logout (NEW - with API call)
export const logoutUserThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/auth/logout");
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

// Async thunk: fetch current user (for session on refresh)
export const fetchCurrentUserThunk = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/auth/me");
      return res.data.user;
    } catch (err) {
      return rejectWithValue(null);
    }
  }
);

// Async thunk: admin login
export const adminLoginThunk = createAsyncThunk(
  "auth/adminLogin",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/admin-login", credentials);
      if (res.data.user?.role !== "admin") {
        return rejectWithValue("Access denied. Admin credentials required.");
      }
      return res.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Admin login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.loading = false;
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      localStorage.removeItem("user");
      toast.success("Logged out successfully"); // ← Add toast
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload));
        toast.success(`Welcome back, ${action.payload.name}!`); // ← Add toast
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload;
        localStorage.removeItem("user");
        toast.error(action.payload || "Login failed"); // ← Add toast
      })

      // Signup - DO NOT authenticate yet
      .addCase(signupUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.otpPhase = true;
        state.userIdForOtp = action.payload.userId;
        toast.success("OTP sent to your email. Please verify to continue."); // ← Add toast
      })
      .addCase(signupUserThunk.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload;
        state.otpPhase = false;
        state.userIdForOtp = null;
        toast.error(action.payload || "Signup failed"); // ← Add toast
      })

      // OTP verify - Authenticate ONLY after successful verification
      .addCase(verifyOtpThunk.pending, (state) => {
        state.loading = true;
        state.otpError = null;
      })
      .addCase(verifyOtpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.otpPhase = false;
        state.userIdForOtp = null;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        toast.success("Account verified successfully! Welcome!"); // ← Add toast
      })
      .addCase(verifyOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.otpError = action.payload;
        toast.error(action.payload || "Invalid or expired OTP"); // ← Add toast
      })

      // Resend OTP
      .addCase(resendOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOtpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        toast.success("New OTP sent to your email!"); // ← Add toast
      })
      .addCase(resendOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to resend OTP"); // ← Add toast
      })

      // Logout thunk (NEW)
      .addCase(logoutUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
        localStorage.removeItem("user");
        toast.success("Logged out successfully"); // ← Add toast
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        // Even if API fails, still log out locally
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        localStorage.removeItem("user");
        toast.error("Logout failed, but you've been logged out locally"); // ← Add toast
      })

      // Fetch current user
      .addCase(fetchCurrentUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCurrentUserThunk.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
        localStorage.removeItem("user");
      })

      // Admin login
      .addCase(adminLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLoginThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload));
        toast.success(`Welcome, ${action.payload.name}!`); // ← Add toast
      })
      .addCase(adminLoginThunk.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload;
        localStorage.removeItem("user");
        toast.error(action.payload || "Admin login failed"); // ← Add toast
      });
  },
});

// Actions
export const { setUser, login, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectOtpPhase = (state) => state.auth.otpPhase;
export const selectUserIdForOtp = (state) => state.auth.userIdForOtp;
export const selectOtpError = (state) => state.auth.otpError;
