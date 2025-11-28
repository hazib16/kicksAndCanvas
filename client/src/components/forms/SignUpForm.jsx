import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../validators/authValidators";
import {
  signupUserThunk,
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

  const handleGoogleSignIn = () => {
    console.log("Google Sign-In clicked");
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Sign up</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <button
        onClick={handleGoogleSignIn}
        type="button"
        className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md py-3 px-4 hover:bg-gray-50 transition mb-6"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </button>

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
