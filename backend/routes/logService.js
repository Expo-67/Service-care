import express from "express";
import Service from "../models/service.model.js";

const router = express.Router();

//POST log a new service
router.post("/log", async (req, res) => {
  try {
    const {
      date,
      mileage,
      garageName,
      mechanicName,
      nextServiceMileage,
      serviceItems,
    } = req.body;
    //Validation
    if (
      !date ||
      !mileage ||
      !garageName ||
      !mechanicName ||
      !nextServiceMileage
    ) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    //the service record
    const service = new Service({
      date,
      mileage,
      garageName,
      mechanicName,
      nextServiceMileage,
      serviceItems,
    });

    //save the service record to database
    await service.save();
    res.status(201).json({ message: "Service logged successfully", service });
  } catch (error) {
    console.error("Error logging service:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

export default router;
