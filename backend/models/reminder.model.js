import { Schema, model } from "mongoose";

const reminderSchema = new Schema(
  {
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
