import User from "../models/userModel.js";

// ========== GET ALL USERS (with search, pagination, sorting) ==========
export const getAllUsers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const filter = { role: "user" };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    const sortObj = {};
    sortObj[sortBy] = order === "desc" ? -1 : 1;

    const skip = (page - 1) * limit;

    const users = await User.find(filter)
      .sort(sortObj)
      .limit(parseInt(limit))
      .skip(skip)
      .select("-password -refreshToken -otp -otpExpires");

    const total = await User.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      users,
      pagination: {
        total,
        page: parseInt(page),
        pages: totalPages,
        limit: parseInt(limit),
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1,
      },
    });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};

// ========== GET USER BY ID ==========
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select(
      "-password -refreshToken -otp -otpExpires"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get user by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};

// ========== BLOCK USER ==========
export const blockUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent admin from blocking themselves
    if (id === req.user.userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot block yourself",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Don't allow blocking other admins
    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Cannot block admin users",
      });
    }

    // Check if already blocked
    if (user.isBlocked) {
      return res.status(400).json({
        success: false,
        message: "User is already blocked",
      });
    }

    user.isBlocked = true;
    user.refreshToken = null; // Force logout blocked user
    await user.save();

    res.json({
      success: true,
      message: `User ${user.name} blocked successfully`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isBlocked: user.isBlocked,
      },
    });
  } catch (error) {
    console.error("Block user error:", error);
    res.status(500).json({
      success: false,
      message: "Error blocking user",
      error: error.message,
    });
  }
};

// ========== UNBLOCK USER ==========
export const unblockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if already unblocked
    if (!user.isBlocked) {
      return res.status(400).json({
        success: false,
        message: "User is not blocked",
      });
    }

    user.isBlocked = false;
    await user.save();

    res.json({
      success: true,
      message: `User ${user.name} unblocked successfully`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isBlocked: user.isBlocked,
      },
    });
  } catch (error) {
    console.error("Unblock user error:", error);
    res.status(500).json({
      success: false,
      message: "Error unblocking user",
      error: error.message,
    });
  }
};
