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
  .post((req, res) => {
    const arr = [...JSON.parse(req.body.member), req.userId];
    if (JSON.parse(req.body.member).length === 1) {
      console.log(arr);
      db.query(
        `select * from chatroom where json_contains(user_list,json_array(${arr.map(
          (v, i) => v
        )})) and json_length(user_list)=2`,
        (err, ok) => {
          if (err) {
            console.log(err);
            return res.send(err);
          }
          if (ok.length !== 0) {
            db.query(
              `update user set recent_room=${ok[0].id} where id=${req.userId}`
            );
            return res.json({ existent_room: ok[0].id });
          } else {
            db.query(
              `insert into chatroom (title,user_list) values ('${req.body.room_name}','[${arr}]')`,
              (err, ok) => {
                if (err) {
                  console.log(err);
                  return res.send(err);
                } else {
                  db.query(
                    `update user set recent_room=${ok.insertId} where id=${req.userId}`
                  );
                  db.query(
                    `insert into chating (room_id,owner,title,createAt) values (${
                      ok.insertId
                    },'date_message','${new Date()}',now())`
                  );
                  db.query(
                    `insert into chating (room_id,owner,title,createAt) values (${ok.insertId},'invite_message','${arr}',now())`
                  );
                  return res.json({ new_room: ok.insertId });
                }
              }
            );
          }
        }
      );
    } else {
      db.query(
        `insert into chatroom (title,user_list) values ('${req.body.room_name}','[${arr}]')`,
        (err, ok) => {
          if (err) {
            console.log(err);
            return res.send(err);
          } else {
            db.query(
              `update user set recent_room=${ok.insertId} where id=${req.userId}`
            );
            db.query(
              `insert into chasting (room_id,owner,title,createAt) values (${
                ok.insertId
              },'date_message','${new Date()}',now())`
            );
            db.query(
              `insert into chating (room_id,owner,title,createAt) values (${ok.insertId},'invite_message','${arr}',now())`
            );
            // db.query(
            //   `update chatroom set recent_chat='${arr.map((v, i) => {
            //     if (i === 0) {
            //       return `${v}님이 `;
            //     }
            //   })}'`
            // );
            return res.json({ new_room: ok.insertId });
          }
        }
      );
    }
  })
  .get((req, res) => {
    db.query(
      `select id,title,user_list,updateAt from chatroom where json_contains(user_list,'${req.userId}')`,
      (err, ok) => {
        if (err) {
          console.log(err);
          return res.send(err);
        } else {
          if (ok.length === 0) {
            return res.json({ message: "채팅방목록이 존재하지 않습니다." });
          } else {
            // for (let i of ok) {
            //   console.log(i.updateAt);
            // }
            return res.send(ok);
          }
        }
      }
    );
  });

module.exports = router;
