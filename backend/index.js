import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import logServiceRoutes from "./routes/logService.js";
import { router as reminderRoutes } from "./routes/Reminder.js";
import CarDetailsRoutes from "./routes/cardetail.js";
import userRoutes from "./routes/userRoutes.js";
import path from "path";

dotenv.config(); //Load up env files
const app = express();
const corsOptions = {
  origin: "http://localhost:3000", //the frontend url
  credentials: true,
};
const PORT = process.env.PORT || 5005;

//enable cors for all routes
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json()); // parse incoming request
app.use(cookieParser()); // parse incoming cookies

// Serve static files from the "uploads" folder
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
//Routes

app.use("/api/auth", authRoutes);
app.use("/api/service", logServiceRoutes);
app.use("/api", reminderRoutes);
app.use("/api", CarDetailsRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  connectDB().catch(() => {
    process.exit(1);
  });
  console.log("Server is running on port:", PORT);
});
