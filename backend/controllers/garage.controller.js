import Garage from "../models/garage.model.js";

// Signup Garage Controller
export const signupGarage = async (req, res) => {
  try {
    const { garagename, garagelocation, garagepassword } = req.body;

    // Check if  garage already exists
    const existingGarage = await Garage.findOne({ garagename });
    if (existingGarage) {
      return res.status(400).json({ message: "Garage already exists" });
    }

    // Create new garage
    const garage = new Garage({ garagename, garagelocation, garagepassword });

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

//login Garage controller
