import express from "express";
import User from "../models/user.model.js"; // Import your user model
import upload from "../middleware/upload.js"; // Import Multer middleware

const router = express.Router();

// Endpoint to upload profile picture
router.post(
  "/profile-picture/:userId",
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const profilePicturePath = req.file.path; // Path to the uploaded file

      // Update the user's profile with the image URL
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePicture: profilePicturePath },
        { new: true } // Return the updated user
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "Profile picture uploaded successfully",
        user: updatedUser,
      });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error uploading profile picture",
          error: error.message,
        });
    }
  }
);

export default router;
