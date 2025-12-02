import User from "../models/userModel.js";
import transporter from "../utils/email.js";
import { OAuth2Client } from 'google-auth-library';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/tokenUtils.js";

// Initialize Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

///signup
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, referralCode } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const generatedReferral =
      referralCode || Math.random().toString(36).substring(2, 8).toUpperCase();

    // Generate OTP and expiry
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes

    // Create unverified user
    const user = new User({
      name,
      email,
      password,
      phone,
      referralCode: generatedReferral,
      role: "user",
      otp,
      otpExpires,
      isVerified: false,
    });

    await user.save();

    // Send email with OTP
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Account OTP",
      text: `Your verification code is ${otp}. It expires in 5 minutes.`,
    });

    //response - user must verify OTP to activate
    res.status(201).json({
      success: true,
      message:
        "Registration initiated. Check your email for the verification code.",
      userId: user._id,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: error.message,
    });
  }
};

// === OTP Verification ===
export const verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const user = await User.findById(userId).select("+otp +otpExpires");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (user.isVerified)
      return res
        .status(400)
        .json({ success: false, message: "User already verified." });

    if (user.otp !== otp || !user.otpExpires || user.otpExpires < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    // Verification successful
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;

    // Issue token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "OTP verified, account activated.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        referralCode: user.referralCode,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("OTP Verify Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

///resend otp
export const resendOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId).select("+otp +otpExpires");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    if (user.isVerified)
      return res
        .status(400)
        .json({ success: false, message: "User already verified" });

    //generate new otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 5 * 60 * 1000;

    //update user with new otp
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    //send email with new otp
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Your new OTP Code",
      text: `Your new verification code is ${otp}. It expires in 5 minutes.`,
    });

    res.status(200).json({
      success: true,
      message: "OTP resent successfuly. Check your email.",
    });
  } catch (error) {
    console.error("Resend OTP Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

///login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check verification status
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your account via OTP email before logging in.",
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked.",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive.",
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    user.lastLogin = new Date();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

// ========== GOOGLE SIGN-IN ==========
export const googleSignIn = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Google credential is required",
      });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      // User exists - update Google ID and avatar if not set
      if (!user.googleId) {
        user.googleId = googleId;
        user.avatar = picture;
        user.isVerified = true;
        await user.save();
      }
    } else {
      // Create new user from Google data
      const generatedReferral = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

      user = new User({
        name,
        email,
        googleId,
        avatar: picture,
        isVerified: true, // Google accounts are pre-verified
        referralCode: generatedReferral,
        role: "user",
        // No password needed for Google auth
      });

      await user.save();
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    user.lastLogin = new Date();
    await user.save();

    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Google sign-in successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    res.status(401).json({
      success: false,
      message: "Google authentication failed",
      error: error.message,
    });
  }
};

// ========== FORGOT PASSWORD ==========

// Send OTP for password reset
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email }).select('+otp +otpExpires');

    if (!user) {
      // Security: Don't reveal if email exists
      return res.status(200).json({
        success: true,
        message: "If an account with that email exists, an OTP has been sent.",
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store OTP
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Send email
    const htmlMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #000;">Password Reset Request</h1>
        <p>You requested to reset your password for your KicksAndCanvas account.</p>
        <p>Your OTP is:</p>
        <div style="background-color: #f5f5f5; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
          <h2 style="font-size: 36px; font-weight: bold; letter-spacing: 8px; margin: 0; color: #000;">${otp}</h2>
        </div>
        <p>This OTP will expire in <strong>10 minutes</strong>.</p>
        <p style="color: #666; font-size: 14px;">If you didn't request this, please ignore this email and your password will remain unchanged.</p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset OTP - KicksAndCanvas",
      html: htmlMessage,
    });

    res.status(200).json({
      success: true,
      message: "OTP sent to your email",
      userId: user._id,
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      success: false,
      message: "Error sending password reset OTP",
    });
  }
};

// Verify OTP and reset password
export const verifyOtpAndResetPassword = async (req, res) => {
  try {
    const { userId, otp, newPassword } = req.body;

    if (!userId || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "User ID, OTP, and new password are required",
      });
    }

    // Find user
    const user = await User.findById(userId).select('+otp +otpExpires +password');

    if (!user || !user.otp || !user.otpExpires) {
      return res.status(400).json({
        success: false,
        message: "Invalid request or OTP not found",
      });
    }

    // Check if OTP expired
    if (Date.now() > user.otpExpires) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    // Verify OTP
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please try again.",
      });
    }

    // OTP is valid - Update password
    user.password = newPassword; // Will be hashed by pre-save hook
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful! You can now login with your new password.",
    });
  } catch (error) {
    console.error("Verify OTP and reset password error:", error);
    res.status(500).json({
      success: false,
      message: "Error resetting password",
    });
  }
};

// Resend OTP for password reset
export const resendResetOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId).select('+otp +otpExpires');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Send email
    const htmlMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #000;">New Password Reset OTP</h1>
        <p>Here is your new OTP:</p>
        <div style="background-color: #f5f5f5; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
          <h2 style="font-size: 36px; font-weight: bold; letter-spacing: 8px; margin: 0; color: #000;">${otp}</h2>
        </div>
        <p>This OTP will expire in <strong>10 minutes</strong>.</p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "New Password Reset OTP - KicksAndCanvas",
      html: htmlMessage,
    });

    res.status(200).json({
      success: true,
      message: "New OTP sent successfully",
    });
  } catch (error) {
    console.error("Resend reset OTP error:", error);
    res.status(500).json({
      success: false,
      message: "Error resending OTP",
    });
  }
};

///admin login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin credentials required.",
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    user.lastLogin = new Date();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

///refresh access token
export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found",
      });
    }

    const decoded = verifyRefreshToken(refreshToken);

    const user = await User.findById(decoded.userId).select("+refreshToken");

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const newAccessToken = generateAccessToken(user);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Access token refreshed",
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Refresh Token Error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};

///logout
export const logoutUser = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (userId) {
      await User.findByIdAndUpdate(userId, { refreshToken: null });
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during logout",
    });
  }
};

///get current user
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Get Current User Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
