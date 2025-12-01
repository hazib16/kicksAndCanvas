import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleLogin } from '@react-oauth/google';
import { loginSchema } from "../../validators/authValidators";
import {
  loginUserThunk,
  googleAuthThunk,
  selectAuthLoading,
  selectAuthError,
  selectOtpPhase,
  selectIsAuthenticated,
} from "../../store/slices/authSlice";
import Input from "../ui/Input";
import Button from "../ui/Button";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const otpPhase = useSelector(selectOtpPhase);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (otpPhase) {
      navigate("/verify-signup-otp");
    }
  }, [otpPhase, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(loginUserThunk(data));
  };

  // Handle Google Sign-In
  const handleGoogleSuccess = (credentialResponse) => {
    dispatch(googleAuthThunk(credentialResponse));
  };

  const handleGoogleError = () => {
    console.error("Google Sign-In failed");
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Log in</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Google Sign-In Button */}
      <div className="mb-6">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap
          theme="outline"
          size="large"
          width="100%"
        />
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">OR</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          id="email"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          type="password"
          id="password"
          {...register("password")}
          error={errors.password?.message}
        />

        <Button type="submit" fullWidth disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Don't have an account?{" "}
        <a href="/signup" className="text-black underline font-medium">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
