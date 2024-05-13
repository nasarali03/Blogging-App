import mongoose from "mongoose";

const userSchame = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchame);

export default User;
