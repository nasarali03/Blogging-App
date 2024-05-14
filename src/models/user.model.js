import { createHmac } from "crypto";
import mongoose from "mongoose";

const userSchame = new mongoose.Schema(
  {
    fullName: {
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

userSchame.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return;
});

const User = mongoose.model("User", userSchame);

export default User;
