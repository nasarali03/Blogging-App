import Router from "express";

const router = Router();

router.get("/add-new", (req, res) => {
  res.render("addBlog", { user: req.user });
});

export default router;
