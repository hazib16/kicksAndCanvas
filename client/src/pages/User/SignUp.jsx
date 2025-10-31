import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance"; // ✅ your axios setup file
import toast, { Toaster } from "react-hot-toast";
import { BreadcrumbContainer } from "./BreadcrumbContainer";
import { Button } from "./Button";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { LoginSignUp } from "./LoginSignUp";
import { LoginSignUpSocial } from "./LoginSignUpSocial";
import { NotificationBar } from "../../components/User/NotificationBar";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    referralCode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await axiosInstance.post("/api/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        referralCode: formData.referralCode,
      });

      toast.success("Signup successful!");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="bg-white overflow-hidden w-full min-h-screen relative">
      <Toaster position="top-center" reverseOrder={false} />

      <Header />
      <NotificationBar />
      <BreadcrumbContainer />

      <form onSubmit={handleSubmit}>
        <div className="w-80 absolute top-[403px] left-[567px] flex flex-col items-start justify-center">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col w-80 items-start justify-center absolute top-[472px] left-[567px]">
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="w-80 absolute top-[548px] left-[567px] flex flex-col items-start justify-center">
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="w-80 absolute top-[622px] left-[567px] flex flex-col items-start justify-center">
          <input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            type="password"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="w-80 absolute top-[696px] left-[567px] flex flex-col items-start justify-center">
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Mobile"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="w-[316px] absolute top-[778px] left-[567px] flex flex-col items-start justify-center">
          <input
            name="referralCode"
            value={formData.referralCode}
            onChange={handleChange}
            placeholder="Referral Code (optional)"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <Button
          className="!justify-center !flex !absolute !left-[568px] !w-[318px] !top-[927px]"
          label="Create account"
          size="default"
          type="submit"
        />
      </form>

      <p className="absolute top-[1000px] left-[calc(50%-100px)] text-gray-600">
        Already have an account? Log in
      </p>

      <Footer />
    </div>
  );
};
