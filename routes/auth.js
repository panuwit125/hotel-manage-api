const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_LIFE,
  ACCESS_TOKEN_LIFE,
} = require("../key");
const requiredLogin = require("../middlewares/requiredLogin");
const refreshToken = require("../middlewares/refreshToken");

router.get("/api/", (req, res) => {
  res.json({ message: "this is auth" });
});

router.get("/api/testmid", requiredLogin, (req, res) => {
  res.json({ message: "this is auth" });
});

router.post("/api/signin", (req, res) => {
  const { user_name, pass_word } = req.body;
  User.findOne({ user_name: user_name }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Not found username" });
    }
    bcrypt
      .compare(pass_word, savedUser.pass_word)
      .then((doMatch) => {
        console.log(doMatch);
        if (doMatch) {
          let payload = { _id: savedUser._id };
          const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: 120,
          });
          const refreshToken = jwt.sign(payload, ACCESS_TOKEN_LIFE, {
            algorithm: "HS256",
            expiresIn: 6000,
          });
          res.json({
            AccessToken: accessToken,
            RefreshToken: refreshToken,
            //savedUser,
          });
        } else {
          return res
            .status(422)
            .json({ error: "Invalid username or password" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

router.post("/api/refreshtoken", refreshToken, (req, res) => {
  console.log(req);
  let payload = { _id: req.user._id };
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: 120,
  });
  const refreshToken = jwt.sign(payload, ACCESS_TOKEN_LIFE, {
    algorithm: "HS256",
    expiresIn: 6000,
  });
  res.json({
    AccessToken: accessToken,
    RefreshToken: refreshToken,
  });
});

router.post("/api/signup", (req, res) => {
  const {
    user_name,
    pass_word,
    first_name,
    last_name,
    email_user,
    birdday_user,
  } = req.body;
  if (
    !user_name ||
    !pass_word ||
    !first_name ||
    !last_name ||
    !email_user ||
    !birdday_user
  ) {
    return res.status(422).json({ error: "Please add all field." });
  }
  User.findOne({ user_name: user_name })
    .then((savedUser) => {
      if (savedUser) {
        console.log(savedUser);
        return res.status(422).json({ error: "User already exist" });
      }
      bcrypt.hash(pass_word, 12).then((hashedpassword) => {
        const user = new User({
          user_name,
          pass_word: hashedpassword,
          first_name,
          last_name,
          email_user,
          birdday_user,
        });
        user
          .save()
          .then((user) => {
            res.json({ message: "saved successfull" });
          })
          .catch((response) => {
            res.status(400).json({ error: "error" });
          });
      });
    })
    .catch((response) => {
      res.status(400).json({ error: "error" });
    });
});

module.exports = router;
