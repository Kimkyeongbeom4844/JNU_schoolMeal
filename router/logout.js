const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  console.log(req.signedCookies);
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  return res.json({ message: "delete cookie" });
});

module.exports = router;
