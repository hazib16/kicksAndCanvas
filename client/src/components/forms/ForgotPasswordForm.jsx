import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  forgotPasswordThunk,
  selectAuthLoading,
} from "../../store/slices/authSlice";
import Input from "../ui/Input";
import Button from "../ui/Button";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // REMOVE THE useEffect - it was here causing the loop

  const onSubmit = async (data) => {
    const result = await dispatch(forgotPasswordThunk(data.email));
    
    // Navigate only after successful dispatch
    if (!result.error) {
      navigate("/verify-reset-otp");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4">Forgot Password?</h1>
      <p className="text-gray-600 mb-8">
        Enter your email address and we'll send you an OTP to reset your
        password.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          id="email"
          placeholder="your@email.com"
          {...register("email")}
          error={errors.email?.message}
        />

        <Button type="submit" fullWidth disabled={loading}>
          {loading ? "Sending OTP..." : "Send OTP"}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Remember your password?{" "}
        <a href="/login" className="text-black underline font-medium">
          Back to Login
        </a>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
