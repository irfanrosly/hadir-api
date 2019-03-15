import jwt from "jsonwebtoken";
import express from "express";

let router = express.Router();

router.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers.authorization;

  // decode token
  if (token) {
    jwt.verify(token, process.env.MY_SECRET, function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: "Failed to authenticate token."
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: "No token provided."
    });
  }
});

router.get("/", (req, res) => {
  console.log(req.query);
  res.send("Play:Home");
});

module.exports = router;
