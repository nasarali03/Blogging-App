import Router from "express";
import {
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/user.contollers.js";

const router = Router();

router.get("/signin", (req, res) => {
  res.render("signin");
});
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signin", loginUser);

router.post("/signup", signupUser);

router.get("/logout", logoutUser);

export default router;
