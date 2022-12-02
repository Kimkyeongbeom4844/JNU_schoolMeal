const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createConnection({
  host: process.env.EXPRESS_APP_HOST,
  user: process.env.EXPRESS_APP_USER,
  password: process.env.EXPRESS_APP_PASSWORD,
  database: process.env.EXPRESS_APP_DATABASE,
});

db.connect((err, ok) => {
  err ? console.log(err) : console.log("db connect success");
});

module.exports = db;
