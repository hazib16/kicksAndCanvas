import { Route } from "react-router-dom";
import PublicRoute from "../PublicRoute";
import Login from "../../pages/User/Login";
import SignUp from "../../pages/User/SignUp";
import VerifySignupOTP from "../../pages/User/VerifySignupOTP";
import ForgotPasswordForm from "../../components/forms/ForgotPasswordForm";
import VerifyResetOtpForm from "../../components/forms/VerifyResetOtpForm";

export const authRoutes = [
  <Route
    key="login"
    path="/login"
    element={
      <PublicRoute>
        <Login />
      </PublicRoute>
    }
  />,

  <Route
    key="signup"
    path="/signup"
    element={
      <PublicRoute>
        <SignUp />
      </PublicRoute>
    }
  />,

  <Route
    key="verify-signup-otp"
    path="/verify-signup-otp"
    element={
      <PublicRoute>
        <VerifySignupOTP />
      </PublicRoute>
    }
  />,

  <Route
    key="forgot-password"
    path="/forgot-password"
    element={
      <PublicRoute>
        <ForgotPasswordForm />
      </PublicRoute>
    }
  />,

  <Route
    key="verify-reset-otp"
    path="/verify-reset-otp"
    element={
      <PublicRoute>
        <VerifyResetOtpForm />
      </PublicRoute>
    }
  />,
];

export default authRoutes;
