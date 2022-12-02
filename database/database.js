const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createConnection({
  host: process.env.EXPRESS_APP_HOST,
  user: process.env.EXPRESS_APP_USER,
  password: process.env.EXPRESS_APP_PASSWORD,
  database: process.env.EXPRESS_APP_DATABASE,
});

const infiniteConnect = db.connect((err, ok) => {
  if (err) {
    console.log(err);
    infiniteConnect;
  } else {
    setInterval(function () {
      db.query("SELECT 1");
    }, 5000);
  }
});
infiniteConnect;

module.exports = db;
