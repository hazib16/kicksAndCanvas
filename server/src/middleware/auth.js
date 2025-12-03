import jwt from "jsonwebtoken";
import { verifyAccessToken } from "../utils/tokenUtils.js";
import User from "../models/userModel.js";

// Main authentication middleware
export const authMiddleware = async (req, res, next) => {
  try {
    // Check both cookies and Authorization header
    const token = 
      req.cookies.accessToken || 
      req.headers.authorization?.split(" ")[1]; // ← Fixed: headers (not header)

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token provided",
      });
    }

    // Verify token
    const decoded = verifyAccessToken(token);

    // Optional: Check if user still exists and is active
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - User not found",
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized - Account blocked",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized - Account inactive",
      });
    }

    // Attach user info to request
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized - Invalid or expired token",
    });
  }
};

// Admin-only middleware (use AFTER authMiddleware)
export const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Forbidden - Admin access required",
    });
  }
  next();
};

// Optional: Role-based middleware (flexible for multiple roles)
export const hasRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden - Insufficient permissions",
      });
    }
    next();
  };
};
