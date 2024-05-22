import User from "../models/user.model.js";

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);

    res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", { error: "Incorrect email or password" });
  }
};

const signupUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });

  res.redirect("/");
};

const logoutUser = (req, res) => {
  res.clearCookie("token").redirect("/");
};
export { loginUser, signupUser, logoutUser };
