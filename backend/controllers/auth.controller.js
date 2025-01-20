// auth.controller.js

import User from "./../models/user.model.js";
import generateTokenAndSetCookie from "./../utils/generateTokenAndSetCookie.js";

// Signup Controller
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    const user = new User({ name, email, password });
    await user.save();

    generateTokenAndSetCookie(user, res);

    return res.status(201).json({
      message: "User created successfully",
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login Controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  generateTokenAndSetCookie(user, res);

  return res.status(200).json({
    message: "Login successful",
    user: { name: user.name, email: user.email },
  });
};

// Logout Controller
export const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
};
