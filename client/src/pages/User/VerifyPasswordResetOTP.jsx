import React from "react";
import { useNavigate } from "react-router-dom";
import OTPVerification from "../../components/forms/OtpVerification";

const VerifyPasswordResetOTP = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleVerify = async (otp) => {
    setLoading(true);
    setError("");
    try {
      // Call your forgot password OTP verify API
      // await verifyPasswordResetOTP(otp);
      navigate("/reset-password");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    // Resend forgot password OTP
    console.log("Resend password reset OTP");
  };

  return (
    <OTPVerification
      onVerify={handleVerify}
      onResend={handleResend}
      loading={loading}
      error={error}
      title="Verify Reset Code"
      description="Enter the code sent to your email to reset your password."
      buttonText="Verify Code"
    />
  );
};

export default VerifyPasswordResetOTP;
