import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import serviceRoutes from "./routes/service.js";
import adminRoutes from "./routes/admin.js";

const app = express();
const corsOptions = { origin: "http://localhost:3000", credentials: true };
// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-default-secret", // Fallback secret if not in .env
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Secure cookies for production (requires HTTPS)
    },
  })
);

// Database connection
mongoose
  .connect(process.env.MONGODB_URI, {
    // Removed deprecated options for MongoDB connection
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
