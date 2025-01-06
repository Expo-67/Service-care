import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config(); //Load up env files
const app = express();
const corsOptions = { origin: "http://localhost:3000", credentials: true };
const PORT = process.env.PORT || 5005;

app.use(cors(corsOptions));
app.use(express.json()); // parse incoming request
app.use();
app.use(cookieParser()); // parse incoming cookies
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDB().catch(() => {
    process.exit(1);
  });
  console.log("Server is running on port:", PORT);
});
