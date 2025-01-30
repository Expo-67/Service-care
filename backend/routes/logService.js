import express from "express";
import Service from "../models/service.model.js";
const router = express.Router();
router.post("/log", async (req, res) => {
  try {
    const {
      userId,
      date,
      mileage,
      garageName,
      mechanicName,
      nextServiceMileage,
      serviceItems,
    } = req.body;

    //Validation: Ensure that all required fields are filled
    if (
      !userId ||
      !date ||
      !mileage ||
      !garageName ||
      !mechanicName ||
      !nextServiceMileage
    ) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Create the service record
    const service = new Service({
      userId,
      date,
      mileage,
      garageName,
      mechanicName,
      nextServiceMileage,
      serviceItems,
    });

    // Save the service record to the database
    await service.save();
    res.status(201).json({ message: "Service logged successfully", service });
  } catch (error) {
    console.error("Error logging service:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

//Fetching all services for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const services = await Service.find({ userId });
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

//export log service router
export default router;
