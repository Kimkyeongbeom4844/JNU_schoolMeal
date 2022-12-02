const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../database/database");

router.use("/", (req, res, next) => {
  if (req.signedCookies.access_token && req.signedCookies.refresh_token) {
    req.userId = jwt.decode(
      req.signedCookies.access_token,
      process.env.EXPRESS_APP_PRIMARY_KEY
    ).id;
    jwt.verify(
      req.signedCookies.refresh_token,
      process.env.EXPRESS_APP_PRIMARY_KEY,
      (err, result) => {
        if (err) {
          res.clearCookie("access_token");
          res.clearCookie("refresh_token");
          return res.json({ message: "unAuthenticated" });
        } else {
          jwt.verify(
            req.signedCookies.access_token,
            process.env.EXPRESS_APP_PRIMARY_KEY,
            (err, result) => {
              if (err) {
                jwt.sign(
                  { id: req.userId },
                  process.env.EXPRESS_APP_PRIMARY_KEY,
                  {
                    algorithm: "HS256",
                    expiresIn: "10s",
                  },
                  (err, token) => {
                    if (err) {
                      console.log(err);
                      return res.send(err);
                    } else {
                      res.clearCookie("access_token");
                      res.cookie("access_token", token, {
                        httpOnly: true,
                        signed: true,
                      });
                      next();
                    }
                  }
                );
              } else {
                next();
              }
            }
          );
        }
      }
    );
  } else {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    return res.json({ message: "unAuthenticated" });
  }
});

router.route("/").get((req, res) => {
  db.query(`select * from user where id=${ok[0].id}`, (err, ok) => {
    if (err) {
      console.log(err);
      return res.send(err);
    } else {
      console.log(ok);
      return res.send(ok);
    }
  });
});

module.exports = router;
