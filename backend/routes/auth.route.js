// auth.route.js

import express from "express";
import {
  signup,
  login,
  logout,
  verifyUser,
} from "../controllers/auth.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// POST Route for Signup
router.post("/signup", signup);

// POST Route for Login
router.post("/login", login);

// POST Route for Logout (clear the JWT cookie)
router.post("/logout", verifyToken, logout);

//Route to verify user and user GET request
router.get("/verify", verifyUser);

export default router;
