import express from "express";
import Service from "../models/service.model.js";

const router = express.Router();

// Route to get all services of logged in user
router.get("/history/:id", async (req, res) => {
  try {
    const services = await Service.find({ user: req.params.id }).sort({
      date: -1,
    });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving services" });
  }
});

export default router;
