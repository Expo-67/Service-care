import express from "express";
const router = express.Router();
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

    //Validation: Ensure that all required fields are filled
    if (
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

//export log service router
export default router;
