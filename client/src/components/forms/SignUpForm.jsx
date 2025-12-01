import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleLogin } from "@react-oauth/google";
import { signupSchema } from "../../validators/authValidators";
import {
  signupUserThunk,
  googleAuthThunk,
  selectAuthLoading,
  selectAuthError,
  selectOtpPhase,
} from "../../store/slices/authSlice";
import Input from "../ui/Input";
import Button from "../ui/Button";

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux selectors
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const otpPhase = useSelector(selectOtpPhase);

  // React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      referralCode: "",
    },
  });

  // Navigate to OTP page after signup succeeds
  useEffect(() => {
    if (otpPhase) {
      navigate("/verify-signup-otp");
    }
  }, [otpPhase, navigate]);

  const onSubmit = (data) => {
    const { confirmPassword, ...signupData } = data;
    dispatch(signupUserThunk(signupData));
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
      <h1 className="text-3xl font-bold mb-8">Sign up</h1>

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
          theme="outline"
          size="large"
          text="signup_with"
        />
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-50 text-gray-500">OR</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Name"
          type="text"
          id="name"
          {...register("name")}
          error={errors.name?.message}
        />

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

        <Input
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <Input
          label="Phone"
          type="tel"
          id="phone"
          {...register("phone")}
          error={errors.phone?.message}
        />

        <div>
          <label
            htmlFor="referralCode"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Referral Code (Optional)
          </label>
          <input
            type="text"
            id="referralCode"
            {...register("referralCode")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
          />
          {errors.referralCode && (
            <p className="mt-1 text-sm text-red-600">
              {errors.referralCode.message}
            </p>
          )}
        </div>

        <div className="pt-2">
          <p className="text-xs text-gray-600 mb-4">
            By Creating An Account You Agree With Our{" "}
            <a href="/terms" className="text-black underline">
              Terms Of Service
            </a>
            ,{" "}
            <a href="/privacy" className="text-black underline">
              Privacy Policy
            </a>
            .
          </p>
          <Button type="submit" fullWidth disabled={loading || isSubmitting}>
            {loading || isSubmitting ? "Creating Account..." : "Create account"}
          </Button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-black underline font-medium">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
