import express from "express";
import path from "path";

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("views"));
console.log(path.resolve("views"));
app.listen(PORT, () => console.log(`Server is listening at ${PORT}`));
