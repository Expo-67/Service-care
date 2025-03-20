import express from "express";

import {
  signupGarage,
  loginGarage,
  logoutGarage,
  verifyGarage,
  getallReminders,
} from "../controllers/garage.controller.js";
import garageToken from "../middleware/garageToken.js";

const router = express.Router();

//Post route for signup
router.post("/signup", signupGarage);

//POST route to log in the garage
router.post("/login", loginGarage);

// POST Route for Logout  from garage account(clear the JWT cookie)
router.post("/logout", garageToken, logoutGarage);

//Route to verify garage and garage GET request
router.get("/verifygarage", verifyGarage);

//Route to get all reminders for garage admin
router.get("/getallreminders", getallReminders);

export default router;
