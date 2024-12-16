import express from "express";
import {
  logService,
  getServiceRecords,
  createReminder,
  getReminders,
  getReports,
  getAiSuggestions,
} from "../controllers/serviceController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/log", auth, logService);
router.get("/records", auth, getServiceRecords);
router.post("/reminder", auth, createReminder);
router.get("/reminders", auth, getReminders);
router.get("/reports", auth, getReports);
router.get("/ai-suggestions", auth, getAiSuggestions);

export default router;
