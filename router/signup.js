const express = require("express");
const router = express.Router();
const db = require("../database/database");

router
  .route("/")
  .get((req, res) => {
    res.send("여기는 /sign");
  })
  .post((req, res) => {
    console.log(req.body);
    db.query(
      `insert into user (username, first_name, last_name, email, password) values('${req.body.username}','${req.body.first_name}','${req.body.last_name}','${req.body.email}','${req.body.password}');`,
      (err, ok) => {
        if (err) {
          console.log(err);
          return res.status(409).json(err);
        }
        console.log(ok);
        return res.json({ message: `회원가입 되었습니다.` });
      }
    );
  });

module.exports = router;
