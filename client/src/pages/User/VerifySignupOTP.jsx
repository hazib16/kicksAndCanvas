import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OTPVerification from "../../components/forms/OtpVerification";
import {
  verifyOtpThunk,
  resendOtpThunk,
  selectUserIdForOtp,
  selectOtpError,
  selectAuthLoading,
  selectIsAuthenticated,
} from "../../store/slices/authSlice";

const VerifySignupOTP = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [resendSuccess, setResendSuccess] = useState(false);

  // Redux selectors
  const userIdForOtp = useSelector(selectUserIdForOtp);
  const otpError = useSelector(selectOtpError);
  const loading = useSelector(selectAuthLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Redirect if no userId (user didn't come from signup)
  useEffect(() => {
    if (!userIdForOtp) {
      navigate("/signup");
    }
  }, [userIdForOtp, navigate]);

  // Redirect to home after successful OTP verification
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleVerify = (otp) => {
    setResendSuccess(false);
    dispatch(verifyOtpThunk({ userId: userIdForOtp, otp }));
  };

  const handleResend = async () => {
    setResendSuccess(false);
    const result = await dispatch(resendOtpThunk({ userId: userIdForOtp }));

    if (result.type === "auth/resendOtp/fulfilled") {
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 5000);
    }
  };

  return (
    <OTPVerification
      onVerify={handleVerify}
      onResend={handleResend}
      loading={loading}
      resendLoading={loading}
      resendSuccess={resendSuccess}
      error={otpError}
      title="Verify Your Email"
      description="We've sent a 6-digit code to your email. Enter it to complete registration."
      buttonText="Verify & Sign Up"
    />
  );
};

export default VerifySignupOTP;
