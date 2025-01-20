import express from "express";
import { CarDetails } from "../models/cardetails.model.js"; // Import the CarDetails model

const router = express.Router();

// Route to retrieve all car details
router.get("/cardetails", async (req, res) => {
  try {
    // Find all car details from the database
    const cars = await CarDetails.find();
    res.status(200).json(cars); // Send the car details as a JSON response
  } catch (error) {
    // Catch any errors and send a 500 response with the error message
    res.status(500).json({ message: "Error retrieving car details", error });
  }
});

// Route to add new car details
router.post("/cardetails", async (req, res) => {
  // Destructure car details from the request body
  const {
    BrandofCar,
    ModelofCar,
    YearofMan,
    EngineCapacity,
    FuelType,
    carIntake,
  } = req.body;

  // Validation for required fields
  if (
    !BrandofCar ||
    !ModelofCar ||
    !YearofMan ||
    !EngineCapacity ||
    !carIntake
  ) {
    return res
      .status(400)
      .json({ message: "All required fields must be provided" });
  }

  try {
    // Create a new carDetails instance
    const newCarDetails = new CarDetails({
      BrandofCar,
      ModelofCar,
      YearofMan,
      EngineCapacity,
      carIntake, // Optional; can be passed or left as default (empty object)
    });

    // Save the new car details to the database
    await newCarDetails.save();
    res.status(201).json(newCarDetails); // Return the created car details as JSON response
  } catch (error) {
    // Catch any errors during saving and return a 500 response with the error message
    res.status(500).json({ message: "Error creating car details", error });
  }
});

// Route to retrieve a specific car's details by its ID
router.get("/cardetails/:id", async (req, res) => {
  const carId = req.params.id; // Get the car ID from the request parameters

  try {
    // Find a car by its ID
    const car = await CarDetails.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(car); // Return the car details as a JSON response
  } catch (error) {
    // Catch any errors and return a 500 response with the error message
    res.status(500).json({ message: "Error retrieving car details", error });
  }
});

// Export the router to be used in the main server file
export { router };
