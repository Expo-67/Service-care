import express from "express";
import {
  login,
  getProfile,
  updateProfile,
  getAllUsers,
  getAllServices,
  getReports,
  logout,
} from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/login", login);
router.get("/profile", adminAuth, getProfile);
router.patch("/profile", adminAuth, updateProfile);
router.get("/users", adminAuth, getAllUsers);
router.get("/services", adminAuth, getAllServices);
router.get("/reports", adminAuth, getReports);
router.post("/logout", adminAuth, logout);

export default router;
