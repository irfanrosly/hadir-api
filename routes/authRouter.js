import bcrypt from "bcrypt";
import User from "../models/user"; // get mongoose User Model
import jwt from "jsonwebtoken"; // used to create, sign, and verify tokens

const express = require("express"),
  router = express.Router();

router.post("/register", function(req, res) {
  if (req.body.name) {
    if (req.body.password) {
      let password = bcrypt.hashSync(req.body.password, 10);

      // create a  user
      var user = new User({
        name: req.body.name,
        password: password,
        admin: false
      });

      // save the user
      user.save(function(err) {
        if (err) throw err;
        console.log("User saved successfully");
        res.json({ success: true });
      });
    } else {
      res.send("Please input password!");
    }
  } else {
    res.send("Please input username!");
  }
});

router.post("/login", function(req, res) {
  User.findOne(
    {
      name: req.body.name
    },
    function(err, user) {
      if (err) throw err;
      if (!user) {
        res.json({
          success: false,
          message: "Authentication failed. User not found."
        });
      } else if (user) {
        var result = bcrypt.compareSync(req.body.password, user.password);
        if (!result) {
          res.json({
            success: false,
            message: "Authentication failed. Wrong password."
          });
        } else {
          const payload = {
            admin: user.admin
          };
          var token = jwt.sign(payload, process.env.MY_SECRET, {
            expiresIn: 86400
          });
          res.json({
            success: true,
            expires_in: 86400,
            access_token: token
          });
        }
      }
    }
  );
});

// exporting thee router to other modules
module.exports = router;
