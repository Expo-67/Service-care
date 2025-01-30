import express from "express";
import Reminder from "../models/reminder.model.js";

const router = express.Router();
//Route to get reminders by userId
router.get("/reminder/:userId", async (req, res) => {
  // Extract userId from query parameters
  const userId = req.params.userId;

  try {
    const reminders = await Reminder.find({ userId });
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving reminders" });
  }
});

router.post("/reminder", async (req, res) => {
  const { service, date, userId } = req.body;

  if (!service || !date) {
    return res
      .status(400)
      .json({ message: `Service and date are required bro` });
  }
  try {
    const newReminder = new Reminder({ service, date, userId }); //new instance of Reminder model
    await newReminder.save(); // saves the new instance to the database
    res.status(201).json(newReminder);
  } catch (error) {
    res.status(500).json({ message: `Error creating reminder` });
  }
});
//Route to delete a reminder
router.delete("/reminder/:id", async (req, res) => {
  const id = req.params.id;
  //   console.log(id);
  try {
    const reminder = await Reminder.findByIdAndDelete(id);
    if (!reminder) {
      return res.status(404).json({ message: `Reminder not found` });
    }
    res.status(200).json({ message: `Reminder deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: `Error deleting reminder` });
  }
});

export { router };
