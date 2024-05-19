import Router from "express";
import { upload } from "../middleware/multer.middleware.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";

const router = Router();

router.get("/add-new", (req, res) => {
  res.render("addBlog", { user: req.user });
});

router.post("/", upload.single("coverImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  uploadOnCloudinary(req.file?.path);
  return res.redirect("/");
});

export default router;
