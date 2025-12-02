import express from "express";
import {
  adminLogin,
  getCurrentUser,
  googleSignIn,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendOtp,
  verifyOtp,
  forgotPassword,
  verifyOtpAndResetPassword,
  resendResetOtp,
} from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";
import {
  adminLoginSchema,
  loginSchema,
  signupSchema,
} from "../validators/authValidators.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Registration & OTP verification
router.post("/signup", validate(signupSchema), registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);

// Login routes
router.post("/login", validate(loginSchema), loginUser);
router.post("/admin-login", validate(adminLoginSchema), adminLogin);

// Google OAuth route
router.post("/google-signin", googleSignIn);

// Password reset routes
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyOtpAndResetPassword);
router.post("/resend-reset-otp", resendResetOtp);

// Token & session management
router.post("/refresh", refreshAccessToken);
router.post("/logout", authMiddleware, logoutUser);
router.get("/me", authMiddleware, getCurrentUser);

export default router;
