const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const html = require("./router/html");
const app = express();
dotenv.config();

app.use(morgan("short"));
app.use(
  cors({
    origin: true,
  })
);
app.use("/html", html);

app.listen(process.env.EXPRESS_APP_PORT, process.env.EXPRESS_APP_HOST, () => {
  console.log(
    `app is running on http://${process.env.EXPRESS_APP_HOST}:${process.env.EXPRESS_APP_PORT}`
  );
});
