import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    date: { type: Date, required: true },
    description: String,
    cost: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
