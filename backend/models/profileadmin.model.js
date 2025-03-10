import { model, Schema } from "mongoose";

const userSchema = new Schema({
  garagename: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "",
  },
});

export default model("profile", userSchema);
