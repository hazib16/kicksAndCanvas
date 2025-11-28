import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

const OTPVerification = ({
  onVerify,
  onResend,
  loading,
  error,
  resendLoading = false,
  resendSuccess = false,
  title = "Verify Your Email",
  description = "Enter the 6-digit code sent to your email",
  buttonText = "Verify OTP",
}) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.trim().length === 6) {
      onVerify(otp);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600 mb-6">{description}</p>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {resendSuccess && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          OTP resent successfully! Check your email.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Enter OTP"
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          placeholder="000000"
          maxLength={6}
        />

        <Button type="submit" fullWidth disabled={loading || otp.length !== 6}>
          {loading ? "Verifying..." : buttonText}
        </Button>
      </form>

      <p className="mt-4 text-sm text-gray-600 text-center">
        Didn't receive the code?{" "}
        <button
          onClick={onResend}
          className="text-black underline font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          disabled={resendLoading}
        >
          {resendLoading ? "Sending..." : "Resend OTP"}
        </button>
      </p>
    </div>
  );
};

export default OTPVerification;
