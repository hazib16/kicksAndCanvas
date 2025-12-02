import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyResetOtpThunk,
  resendResetOtpThunk,
  selectAuthLoading,
  selectUserIdForReset,
  selectOtpError,
} from "../../store/slices/authSlice";
import Button from "../ui/Button";

const VerifyResetOtpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const userId = useSelector(selectUserIdForReset);
  const otpError = useSelector(selectOtpError);

  const hasRedirected = useRef(false); // Track if redirect already happened

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Fixed redirect - only runs once
  useEffect(() => {
    if (!userId && !hasRedirected.current) {
      hasRedirected.current = true;
      navigate("/forgot-password", { replace: true });
    }
  }, [userId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords don't match");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    const result = await dispatch(
      verifyResetOtpThunk({ userId, otp, newPassword })
    );

    if (!result.error) {
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  const handleResendOtp = () => {
    dispatch(resendResetOtpThunk({ userId }));
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4">Reset Password</h1>
      <p className="text-gray-600 mb-8">
        Enter the OTP sent to your email and your new password.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="otp"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Enter OTP
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="Enter 6-digit OTP"
            maxLength={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none text-center text-2xl font-bold tracking-widest"
          />
          {otpError && (
            <p className="mt-1 text-sm text-red-600">{otpError}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
          />
          {passwordError && (
            <p className="mt-1 text-sm text-red-600">{passwordError}</p>
          )}
        </div>

        <Button
          type="submit"
          fullWidth
          disabled={loading || !otp || !newPassword || !confirmPassword}
        >
          {loading ? "Resetting Password..." : "Reset Password"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={handleResendOtp}
          disabled={loading}
          className="text-sm text-gray-600 hover:text-black underline"
        >
          Didn't receive OTP? Resend
        </button>
      </div>

      <p className="text-center text-sm text-gray-600 mt-6">
        <a href="/login" className="text-black underline font-medium">
          Back to Login
        </a>
      </p>
    </div>
  );
};

export default VerifyResetOtpForm;
