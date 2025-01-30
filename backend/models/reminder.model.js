import { Schema, model } from "mongoose";

const reminderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    service: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // automatically add createdAt and updatedAt fields
  }
);
const Reminder = model("Reminder", reminderSchema);

export default Reminder;
