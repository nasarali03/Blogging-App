import Blog from "../models/blog.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";
import Comment from "../models/comments.model.js";

const addBlog = async (req, res) => {
  try {
    const { title, body } = req.body;
    const response = await uploadOnCloudinary(req.file?.path);
    const coverImageURL = response.url;

    const blog = await Blog.create({
      title,
      body,
      coverImageURL,
      createdBy: req.user._id,
    });

    // Use the correct signature for res.redirect
    return res.redirect(`/blog/${blog._id}`);
  } catch (error) {
    console.error("Error adding blog:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const comments = async (req, res) => {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
};

export { addBlog, comments };
