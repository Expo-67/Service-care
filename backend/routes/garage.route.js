import express from "express";

import { signupGarage, loginGarage } from "../controllers/garage.controller.js";

const router = express.Router();

//Post route for signup
router.post("/signup", signupGarage);

//POST route to log in the garage
router.post("login", loginGarage);

export default router;
