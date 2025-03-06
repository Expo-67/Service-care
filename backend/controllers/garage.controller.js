import Garage from "../models/garage.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import generateTokenAndSetCookie from "./../utils/generateTokenAndSetCookie.js";
dotenv.config(); //load the env variables

// Signup Garage Controller
export const signupGarage = async (req, res) => {
  const { garageName, garageLocation, garageEmail, garagePassword } = req.body;

  // Check if garage already exists
  const garageExists = await Garage.findOne({ garageName });
  if (garageExists) {
    return res.status(400).json({ message: "Garage already exists" });
  }
  try {
    // Create new instance of garage
    const garage = new Garage({
      garageName,
      garageLocation,
      garageEmail,
      garagePassword,
    });

    // Save garage to the database
    await garage.save();

    // Generate token and set cookie
    generateTokenAndSetCookie(garage, res);

    return res.status(201).json({
      message: "Garage created successfully",
      garage: {
        name: garage.garageName,
        location: garage.garageLocation,
        email: garage.garageEmail,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login Garage Controller
export const loginGarage = async (req, res) => {
  const { garageName, garagePassword } = req.body;

  // Check if garage exists
  const garage = await Garage.findOne({ garageName });
  if (!garage) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Compare password
  const isMatch = await existingGarage.comparePassword(garagePassword);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Generate token and set cookie
  generateTokenAndSetCookie(existingGarage, res);

  return res.status(200).json(garage);
  // message: "Login successful",
  // garage: {
  //   id: existingGarage._id,
  //   name: existingGarage.garageName,
  //   location: existingGarage.garageLocation,
  // },
};

// Logout Garage Controller
export const logoutGarage = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
};

// Verify Garage
export const verifyGarage = (req, res) => {
  const token = req.cookies.token;

  try {
    if (!token) {
      return res.status(401).json({ message: "Garage is not authenticated" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json(payload);
  } catch (error) {
    res.status(401).json({ message: "Garage is not authenticated" });
    console.log(error.message);
  }
};
