import Garage from "../models/garage.model.js";

// Signup Garage Controller
export const signupGarage = async (req, res) => {
  try {
    const { garageName, garageLocation, garagePassword } = req.body;

    // Check if garage already exists
    const existingGarage = await Garage.findOne({ garageName });
    if (existingGarage) {
      return res.status(400).json({ message: "Garage already exists" });
    }

    // Create new garage
    const garage = new Garage({ garageName, garageLocation, garagePassword });

    // Save garage to the database
    await garage.save();

    res.status(201).json({ message: "Garage created successfully" });
  } catch (err) {
    console.error("Error creating garage:", err);
    res
      .status(500)
      .json({ message: "Error creating garage", error: err.message });
  }
};

// Login Garage Controller
export const loginGarage = async (req, res) => {
  try {
    const { garageName, garagePassword } = req.body;

    // Check if garage exists
    const existingGarage = await Garage.findOne({ garageName });
    if (!existingGarage) {
      return res.status(400).json({ message: "Garage does not exist" });
    }

    // Compare password
    const isMatch = await existingGarage.comparePassword(garagePassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid garage password" });
    }

    res.status(200).json({
      message: "Login successful",
      garage: {
        id: existingGarage._id,
        name: existingGarage.garageName,
        location: existingGarage.garageLocation,
      },
    });
  } catch (err) {
    console.error("Error logging in garage:", err);
    res
      .status(500)
      .json({ message: "Error logging in garage", error: err.message });
  }
};
