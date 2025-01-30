// auth.controller.js

import User from "./../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import generateTokenAndSetCookie from "./../utils/generateTokenAndSetCookie.js";
dotenv.config();
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

  // Now you can generate the token with the method defined in the schema
  // const token = user.generateAuthToken();

  generateTokenAndSetCookie(user, res);
  // const {_id, name, email} = user;
  return res.status(200).json(user);
};

// Logout Controller
export const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
};
// verifying the user
export const verifyUser = (req, res) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json({ message: "user1 is not authenticated" });
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json(payload);
  } catch (error) {
    res.status(401).json({ message: "user is not authenticated" });
    console.log(error.message);
  }
};
