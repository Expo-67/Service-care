import express from "express";
import profile from "../models/profile.model.js";
import multer from "multer"; //for file uploads

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Generate unique file names
  },
});

// File type validation
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error("Only .png or .jpg files are allowed!"), false); // Reject file
  }
};
const upload = multer({ storage, fileFilter });

// Route to update profile picture

router.put(
  "/profile-picture/:id",
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({
            message: "Invalid file type. Only .png or .jpg files are allowed.",
          });
      }

      const userId = req.params.id;
      const filePath = req.file.path;

      // Update the user's profile picture in the database
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePicture: filePath },
        { new: true } // Return the updated document
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "Profile picture updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;
