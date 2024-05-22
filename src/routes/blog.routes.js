import Router from "express";
import { upload } from "../middleware/multer.middleware.js";
import { addBlog } from "../controllers/blog.controllers.js";

const router = Router();

router.get("/add-new", (req, res) => {
  res.render("addBlog", { user: req.user });
});

router.post("/", upload.single("coverImage"), addBlog);

export default router;
