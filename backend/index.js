import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import logServiceRoutes from "./routes/logService.js";
import retrieveServiceRoutes from "./routes/RetrieveService.js";
import { router as reminderRoutes } from "./routes/Reminder.js";
import { router as CarDetailsRouter } from "./routes/cardetail.js";
import { Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.API_KEY })
); //Create an instance of the OpenAIApi class
openai
  .createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello CHatgpt" }],
  })
  .then((res) => {
    console.log(res);
  });
dotenv.config(); //Load up env files
const app = express();
const corsOptions = { origin: "http://localhost:3000", credentials: true };
const PORT = process.env.PORT || 5005;

app.use(cors(corsOptions));
app.use(express.json()); // parse incoming request
app.use(cookieParser()); // parse incoming cookies

//Routes

app.use("/api/auth", authRoutes);
app.use("/api/service", logServiceRoutes);
app.use("/api/service", retrieveServiceRoutes);
app.use("/api", reminderRoutes);
app.use("/api", CarDetailsRouter);

app.listen(PORT, () => {
  connectDB().catch(() => {
    process.exit(1);
  });
  console.log("Server is running on port:", PORT);
});
