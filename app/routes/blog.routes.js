import Router from "express";
import { upload } from "../middleware/multer.middleware.js";
import { addBlog, comments } from "../controllers/blog.controllers.js";
import Blog from "../models/blog.model.js";
import Comment from "../models/comments.model.js";

const router = Router();

router.get("/add-new", (req, res) => {
  res.render("addBlog", { user: req.user });
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );

  return res.render("blog", { user: req.user, blog: blog, comments: comments });
});

router.post("/comment/:blogId", comments);

router.post("/", upload.single("coverImage"), addBlog);

export default router;
