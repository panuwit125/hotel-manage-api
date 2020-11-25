const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const BookingUser = mongoose.model('BookingUser')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const requiredLogin = require("../middlewares/requiredLogin");
const refreshToken = require("../middlewares/refreshToken");
const multer = require("multer");
const path = require("path");
const Moment = require("moment");
const { extendMoment } = require("moment-range");
const moment = extendMoment(Moment);


router.get("/api/getbooking", requiredLogin, async (req, res) => {
  console.log(req.user);
  const { _id } = req.user;
  //res.json(_id)
  if (!_id) {
    return res.status(422).json({ error: "not found id" });
  }
  BookingUser.find({user_id:_id}).then(result=>{
      res.json(result)
  }).catch(error=>{
      res.status(422).json(error.response)
  })
});

module.exports = router;
