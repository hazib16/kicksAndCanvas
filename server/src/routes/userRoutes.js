import express from "express";
import {
  getAllUsers,
  blockUser,
  unblockUser,
  getUserById,
} from "../controllers/userController.js";
import { authenticateToken, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication and admin role
router.use(authenticateToken);
router.use(adminOnly);

// Get all users with pagination and search
router.get("/", getAllUsers);

// Get single user
router.get("/:userId", getUserById);

// Block user
router.patch("/:userId/block", blockUser);

// Unblock user
router.patch("/:userId/unblock", unblockUser);

export default router;
