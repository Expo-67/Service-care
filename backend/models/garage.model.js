import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

//  Schema
const garageSchema = new Schema(
  {
    garageName: {
      type: String,
      required: true,
    },
    garageLocation: {
      type: String,
      required: true,
    },
    garageEmail: {
      type: String,
      required: true,
    },
    garagePassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Password Hashing Middleware
garageSchema.pre("save", async function (next) {
  if (!this.isModified("garagePassword")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.garagePassword = await bcrypt.hash(this.garagePassword, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to Check Password
garageSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.garagePassword);
};

// Create Garage Model
const Garage = mongoose.model("Garage", garageSchema);

export default Garage;
