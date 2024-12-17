import mongoose from "mongoose";

// Define a schema for service items
// const serviceItemSchema = new mongoose.Schema({
//   checked: {
//     type: Boolean,
//     default: false,
//   },
//   changed: {
//     type: Boolean,
//     default: false,
//   },
//});

// Define the main log service schema
const logServiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceDate: {
      type: Date,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    garageName: {
      type: String,
      required: true,
    },
    mechanicName: {
      type: String,
      required: true,
    },
    nextServiceMileage: {
      type: Number,
      required: true,
    },
    // serviceItems: {
    //   engineOil: serviceItemSchema,
    //   oilFilter: serviceItemSchema,
    //   airFilter: serviceItemSchema,
    //   fuelFilter: serviceItemSchema,
    //   sparkPlugs: serviceItemSchema,
    //   brakePads: serviceItemSchema,
    //   brakeFluid: serviceItemSchema,
    // },
  },
  { timestamps: true }
);

const LogService = mongoose.model("LogService", logServiceSchema);

export default LogService;
