import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: false, // ← Changed: Not required for Google auth
      minlength: 6,
      select: false,
    },
    phone: {
      type: String,
      required: false, // ← Changed: Not required for Google auth
      trim: true,
    },
    googleId: { // ← Added: Store Google user ID
      type: String,
      unique: true,
      sparse: true, // Allows null values to be non-unique
    },
    avatar: { // ← Added: Store profile picture URL
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    referralCode: {
      type: String,
      default: null,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
      select: false,
    },
    otp: {
      type: String,
      select: false,
    },
    otpExpires: {
      type: Date,
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Hash password before saving (only if password exists and is modified)
userSchema.pre("save", async function (next) {
  // ← Updated: Check if password exists before hashing
  if (!this.isModified("password") || !this.password) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method (with safety check)
userSchema.methods.comparePassword = async function (candidatePassword) {
  // ← Updated: Return false if no password set (Google auth users)
  if (!this.password) {
    return false;
  }
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove sensitive fields from JSON responses
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.refreshToken;
  delete obj.otp;
  delete obj.otpExpires;
  return obj;
};

export default mongoose.model("User", userSchema);
