import express from "express";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js";
import connectDB from "./db/connection.js";
import { checkForAuthanticationCookie } from "./middleware/authantication.middleware.js";

dotenv.config({ path: "./.env" });

const app = express();
const PORT = 8000;

const view_path = path.resolve("./views");
app.set("view engine", "ejs");
app.set("views", view_path);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthanticationCookie("token"));

app.use("/user", userRouter);
app.use("/", blogRouter);
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

connectDB().then(() => {
  console.log("MongoDB Connected");
  app.listen(PORT, () => console.log(`Server is listening at ${PORT}`));
});
