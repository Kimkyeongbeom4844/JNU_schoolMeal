const express = require("express");
const router = express.Router();
const request = require("request");
const cheerio = require("cheerio");

router.route("/").get((req, res) => {
  const url =
    process.env.EXPRESS_APP_MEALADDRESS ||
    "https://www.jejunu.ac.kr/camp/stud/foodmenu";
  request(url, (err, result, html) => {
    const $ = cheerio.load(html);
    return res.json($("table.border_left").text());
  });
});

module.exports = router;
