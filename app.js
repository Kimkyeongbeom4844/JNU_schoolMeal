const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./database/database");
const path = require("path");
const html = require("./router/html");
const login = require("./router/login");
const signup = require("./router/signup");
const chatroom = require("./router/chatroom");
const friendList = require("./router/friend");
const logout = require("./router/logout");
const chating = require("./router/chating");
const user = require("./router/user");
const app = express();
app.use(cookieParser(process.env.EXPRESS_APP_PRIMARY_KEY));

const port = process.env.PORT || 3000;
// "https://jnu-school-meal.vercel.app"
app.use(morgan("short"));
app.use(
  cors({
    origin: "https://jnu-school-meal.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/html", html);
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/login", login);
app.use("/signup", signup);
app.use("/chatroom", chatroom);
app.use("/logout", logout);
app.use("/friend", friendList);
app.use("/chating", chating);
app.use("/user", user);

app.listen(port);
