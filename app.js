const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const html = require("./router/html");
const app = express();
dotenv.config();
const port = process.env.PORT || 8080;

app.use(morgan("short"));
app.use(
  cors({
    origin: "https://jnu-school-meal.vercel.app",
    credentials: true,
  })
);
app.use("/html", html);

app.listen(port);