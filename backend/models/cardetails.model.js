import { model, Schema } from "mongoose";

const carIntake = new Schema({
  petrol: { type: Boolean, default: false },
  diesel: { type: Boolean, default: false },
  electric: { type: Boolean, default: false },
  hybrid: { type: Boolean, default: false },
  lpg: { type: Boolean, default: false },
  cng: { type: Boolean, default: false },
});

const carDetailsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    BrandofCar: {
      type: "String",
      required: true,
    },
    ModelofCar: {
      type: "String",
      required: true,
    },
    YearofMan: {
      type: Number,
      required: true,
    },
    EngineCapacity: {
      type: Number,
      required: true,
    },
    carIntake: {
      type: carIntake,
      default: () => ({}),
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const CarDetails = model("CarDetails", carDetailsSchema);

export { CarDetails };
