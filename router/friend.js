const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../database/database");
// const authentication = require("../util/authenticate");

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

router
  .route("/")
  .get((req, res) => {
    db.query(
      `select friend_list from user where id=${req.userId}`,
      (err, ok) => {
        if (err) {
          console.log(err);
          return res.send(err);
        } else {
          console.log(ok);
          if (ok[0].friend_list === null) {
            return res.json({ message: "친구가 없습니다." });
          } else {
            const arr = [];
            for (let i of JSON.parse(ok[0].friend_list)) {
              arr.push(i);
            }
            db.query(
              `select username,id from user where ${arr.map((v, i) =>
                JSON.parse(ok[0].friend_list).length - 1 === i
                  ? `id=${v};`
                  : `id=${v} or`
              )}`.replace(/or,/gi, `or `),
              (err, ok) => {
                if (err) {
                  console.log(err);
                  return res.send(err);
                } else {
                  console.log(ok);
                  return res.json(ok);
                }
              }
            );
          }
        }
      }
    );
  })
  .post((req, res) => {
    db.query(
      `select * from user where email='${req.body.email}';`,
      (err, ok) => {
        if (err) {
          console.log(err);
          return res.send(err);
        } else {
          if (ok[0] === undefined) {
            return res.json({ message: "일치하는 유저가 없습니다." });
          } else if (ok[0].id === req.userId) {
            return res.json({ message: "본인입니다." });
          } else {
            const user = ok[0].id;
            db.query(
              `select friend_list from user where id=${req.userId}`,
              (err, ok) => {
                if (err) {
                  console.log(err);
                  return res.send(err);
                } else {
                  console.log(!JSON.parse(ok[0].friend_list));
                  if (JSON.parse(ok[0].friend_list) !== null) {
                    if (JSON.parse(ok[0].friend_list).includes(user)) {
                      return res.json({ message: "이미 추가된 친구입니다." });
                    } else {
                      db.query(
                        `update user set friend_list='[${[
                          ...JSON.parse(ok[0].friend_list),
                          user,
                        ]}]' where id=${req.userId}`,
                        (err, ok) => {
                          if (err) {
                            console.log(err);
                            return res.send(err);
                          } else {
                            console.log(ok);
                            return res.json("성공");
                          }
                        }
                      );
                    }
                  } else {
                    db.query(
                      `update user set friend_list='[${user}]' where id=${req.userId}`,
                      (err, ok) => {
                        if (err) {
                          console.log(err);
                          return res.send(err);
                        } else {
                          console.log(ok);
                          return res.json("성공");
                        }
                      }
                    );
                  }
                }
              }
            );
          }
        }
      }
    );
  });

module.exports = router;
