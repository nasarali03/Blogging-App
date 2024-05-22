import Blog from "../models/blog.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";

const addBlog = async (req, res) => {
  const { title, body } = req.body;
  const response = await uploadOnCloudinary(req.file?.path);
  const coverImageURL = response.url;

  const blog = await Blog.create({
    title,
    body,
    coverImageURL,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${blog._id}`, { user: req.user, blog: blog });
};

export { addBlog };
