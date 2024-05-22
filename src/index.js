import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js";
import connectDB from "./db/connection.js";
import { checkForAuthanticationCookie } from "./middleware/authantication.middleware.js";
import Blog from "./models/blog.model.js";

dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 8000;

const view_path = path.resolve("./views");
app.set("view engine", "ejs");
app.set("views", view_path);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthanticationCookie("token"));

app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({}).sort("-createdAt");
  res.render("home", { user: req.user, blogs: allBlogs });
});

connectDB().then(() => {
  console.log("MongoDB Connected");
  app.listen(PORT, () => console.log(`Server is listening at ${PORT}`));
});
