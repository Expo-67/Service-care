import express from "express";
import { CarDetails } from "../models/cardetails.model.js";

const router = express.Router();

// POST route to create a new car detail
router.post("/cardetails", async (req, res) => {
  const { BrandofCar, ModelofCar, YearofMan, EngineCapacity, carIntake } =
    req.body;

  console.log("brand of car", BrandofCar);
  console.log("model of car", ModelofCar);
  console.log("year of man", YearofMan);
  console.log("engine capacity", EngineCapacity);

  if (!BrandofCar || !ModelofCar || !YearofMan || !EngineCapacity) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newCarDetail = new CarDetails({
      BrandofCar,
      ModelofCar,
      YearofMan,
      EngineCapacity,
      carIntake,
    });

    await newCarDetail.save(); // Save to MongoDB
    return res.status(201).json({
      message: "Car details created successfully",
      carDetail: newCarDetail,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error saving car details", error });
  }
});

// GET route to fetch all car details
router.get("/cardetails", async (req, res) => {
  try {
    const carDetails = await CarDetails.find(); // Retrieve all car details
    return res.status(200).json(carDetails);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching car details", error });
  }
});

export default router; // Export router as default
