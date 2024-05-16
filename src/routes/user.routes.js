import Router from "express";
import User from "../models/user.model.js";

const router = Router();

router.get("/signin", (req, res) => {
  res.render("signin");
});
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
});

router.post("/signup", async (req, res) => {
  await User.create(req.body);
  res.redirect("/");
});

export default router;
