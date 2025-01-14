import express from "express";
import Service from "../models/service.model.js";

const router = express.Router();

//Route to get all services
router.get("/history", async (req, res) => {
  try {
    const services = await Service.find().sort({ date: -1 }); // Retrieve all services, sorted by date (newest first)
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "Failed to fetch services" });
  }
});

export default router;
