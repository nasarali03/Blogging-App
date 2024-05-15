import { createHmac, randomBytes } from "crypto";
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

  const salt = randomBytes(16).toString();
  const hashPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = this.password;
});

const User = mongoose.model("User", userSchame);

export default User;
