import { model, Schema } from "mongoose";
//profile picture model
const profileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String, // URL or file path of the profile picture
      validate: {
        validator: function (v) {
          return /\.(jpg|jpeg|png)$/i.test(v); // Regex to validate .jpg or .png
        },
        message: (props) => `${props.value} is not a valid image format!`,
      },
    },
  },
  { timestamps: true }
);
const profile = model("Profile", profileSchema);
export default profile;
