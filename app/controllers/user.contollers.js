import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";

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
  console.log(req.file?.path);
  const response = await uploadOnCloudinary(req.file?.path);
  console.log(response);
  const profileImageURL = response.url;

  await User.create({
    fullName,
    email,
    password,
    profileImageURL,
  });

  res.redirect("/");
};

const logoutUser = (req, res) => {
  res.clearCookie("token").redirect("/");
};
export { loginUser, signupUser, logoutUser };
