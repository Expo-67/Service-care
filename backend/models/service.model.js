import { model, Schema } from "mongoose";

const serviceItemSchema = new Schema({
  checked: { type: Boolean, default: false }, // Indicates if the item was checked
  changed: { type: Boolean, default: false }, // Indicates if the item was changed
});

const serviceSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
      min: 0, // Ensure mileage is a positive number
    },
    serviceItems: {
      engineOil: { type: serviceItemSchema, default: () => ({}) },
      oilFilter: { type: serviceItemSchema, default: () => ({}) },
      airFilter: { type: serviceItemSchema, default: () => ({}) },
      fuelFilter: { type: serviceItemSchema, default: () => ({}) },
      sparkPlugs: { type: serviceItemSchema, default: () => ({}) },
      brakePads: { type: serviceItemSchema, default: () => ({}) },
      brakeFluid: { type: serviceItemSchema, default: () => ({}) },
    },
    garageName: {
      type: String,
      required: true,
      trim: true, // Removes extra spaces
    },
    mechanicName: {
      type: String,
      required: true,
      trim: true,
    },
    nextServiceMileage: {
      type: Number,
      required: true,
      min: 0, // Ensure the next service mileage is a positive number
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export default model("Service", serviceSchema);
