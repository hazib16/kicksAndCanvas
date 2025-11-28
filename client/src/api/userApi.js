import axiosInstance from "./axiosInstance.js";

///user signup
export const userSignup = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Signup Failed";
  }
};

///user login
export const userLogin = async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

///admin login
export const adminLogin = async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/admin-login", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Admin login failed";
  }
};
