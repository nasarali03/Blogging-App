import express from "express";
import path from "path";

const app = express();
const PORT = 8000;

const view_path = path.resolve("./views");
app.set("view engine", "ejs");
app.set("views", view_path);

console.log(path.resolve("views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(PORT, () => console.log(`Server is listening at ${PORT}`));
