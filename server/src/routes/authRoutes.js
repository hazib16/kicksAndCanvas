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
} from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";
import {
  adminLoginSchema,
  loginSchema,
  signupSchema,
} from "../validators/authValidators.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), registerUser);
router.post("/verify-otp", verifyOtp)
router.post("/resend-otp",resendOtp)
router.post("/login", validate(loginSchema), loginUser);
router.post("/admin-login", validate(adminLoginSchema), adminLogin);
router.post("/refresh", refreshAccessToken)
router.post("/logout",authMiddleware, logoutUser);
router.get("/me", authMiddleware, getCurrentUser);

// Google OAuth route
router.post("/google-signin", googleSignIn)

export default router;
