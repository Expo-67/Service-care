import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

//  Schema
const garageSchema = new Schema({
  garagename: {
    type: String,
    required: true,
  },
  garagelocation: {
    type: String,
    required: true,
  },
  garagepassword: {
    type: String,
    required: true,
  },
});

// Password Hashing Middleware
garageSchema.pre("save", async function (next) {
  if (!this.isModified("garagepassword")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.garagepassword = await bcrypt.hash(this.garagepassword, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to Check Password
garageSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.garagepassword);
};

// Create Garage Model
const Garage = mongoose.model("Garage", garageSchema);

export default Garage;
