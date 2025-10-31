import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//signup
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, referralCode } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const generatedReferral =
      referralCode || Math.random().toString(36).substring(2, 8).toUpperCase();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      referralCode: generatedReferral,
      isBlocked: false,
    });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        })
        .status(201)
        .json({
          success: true,
          message: "User registered successfully",
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            referralCode: user.referralCode,
            isBlocked: user.isBlocked,
          },
        });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


