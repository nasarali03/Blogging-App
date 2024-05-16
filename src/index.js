import express from "express";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import connectDB from "./db/connection.js";

dotenv.config({ path: "./.env" });

const app = express();
const PORT = 8000;

const view_path = path.resolve("./views");
app.set("view engine", "ejs");
app.set("views", view_path);
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.render("home");
});

connectDB().then(() => {
  console.log("MongoDB Connected");
  app.listen(PORT, () => console.log(`Server is listening at ${PORT}`));
});
