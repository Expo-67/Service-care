import express from "express";

import { signupGarage } from "../controllers/garage.controller.js";

const router = express.Router();

//Post route for signup
router.post("/signup", signupGarage);

export default router;
