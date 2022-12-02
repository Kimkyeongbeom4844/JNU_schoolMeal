const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../database/database");

router
  .route("/")
  .get((req, res) => {
    return res.send("여기는 /login");
  })
  .post((req, res) => {
    console.log(req.body.email);
    const refresh = jwt.sign(
      { id: req.body.email },
      process.env.EXPRESS_APP_PRIMARY_KEY,
      {
        algorithm: "HS256",
        expiresIn: "14d",
      }
    );
    jwt.sign(
      { id: req.body.email },
      process.env.EXPRESS_APP_PRIMARY_KEY,
      {
        algorithm: "HS256",
        expiresIn: "5m",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          return res.send(err);
        }
        res.cookie("access_token", token, {
          domain: "jnu-shool-meal.vercel.app",
          httpOnly: true,
          signed: true,
          secure: true,
          sameSite: "none",
        });
        res.cookie("refresh_token", refresh, {
          domain: "jnu-shool-meal.vercel.app",
          httpOnly: true,
          signed: true,
          secure: true,
          sameSite: "none",
        });
        return res.json({ message: "success" });
      }
    );
    // db.connect();
    // db.query(
    //   `select id,password from user where email='${req.body.email}'`,
    //   (err, ok) => {
    //     if (err) {
    //       console.log(err);
    //       return res.send({ message: "fail" });
    //     }
    //     if (ok[0]) {
    //       if (req.body.password === ok[0].password) {
    //         const refresh = jwt.sign(
    //           { id: ok[0].id },
    //           process.env.EXPRESS_APP_PRIMARY_KEY,
    //           {
    //             algorithm: "HS256",
    //             expiresIn: "14d",
    //           }
    //         );
    //         jwt.sign(
    //           { id: ok[0].id },
    //           process.env.EXPRESS_APP_PRIMARY_KEY,
    //           {
    //             algorithm: "HS256",
    //             expiresIn: "5m",
    //           },
    //           (err, token) => {
    //             if (err) {
    //               console.log(err);
    //               return res.send(err);
    //             }
    //             res.cookie("access_token", token, {
    //               domain: "jnu-shool-meal.vercel.app",
    //               httpOnly: true,
    //               signed: true,
    //               secure: true,
    //               sameSite: "none",
    //             });
    //             res.cookie("refresh_token", refresh, {
    //               domain: "jnu-shool-meal.vercel.app",
    //               httpOnly: true,
    //               signed: true,
    //               secure: true,
    //               sameSite: "none",
    //             });
    //             return res.json({ message: "success" });
    //           }
    //         );
    //       } else {
    //         return res.json({ message: "fail" });
    //       }
    //     } else {
    //       return res.json({ message: "fail" });
    //     }
    //   }
    // );
  });

module.exports = router;
