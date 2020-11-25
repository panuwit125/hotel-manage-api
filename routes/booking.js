const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const Hotel = mongoose.model("Hotel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const requiredLogin = require("../middlewares/requiredLogin");
const refreshToken = require("../middlewares/refreshToken");
const multer = require("multer");
const path = require("path");
const Moment = require("moment");
const { extendMoment } = require("moment-range");
const moment = extendMoment(Moment);
const { findOneBooking } = require("../functions/findbookingbyid");
const {
  saveOneBooking,
  saveBookingUser,
} = require("../functions/savebookingeachdate");

router.post("/api/booking", requiredLogin, async (req, res) => {
  const { check_in, check_out, hotel_id, numberroom } = req.body;
  const start = moment(check_in);
  const end = moment(check_out);
  const range = moment.range(start, end);
  console.log(range.diff("days"));
  var timebefore = check_in.split("-");
  var timeafter = check_out.split("-");
  console.log(timebefore, timeafter);
  var avalible = false;
  var checkloop = false;
  var hotel_unavalible = [];
  try {
    var day = parseInt(timebefore[2]);
    var month = parseInt(timebefore[1]);
    var year = parseInt(timebefore[0]);
    console.log("check1", avalible);
    for (var i = 0; i < range.diff("days"); i++) {
      if (
        day >= 30 &&
        (month === 4 || month === 6 || month === 9 || month === 11)
      ) {
        const result = await findOneBooking(
          "" + year + "-" + month + "-" + day + "",
          hotel_id
        );
        if (result.length >= numberroom) {
          await hotel_unavalible.push(
            "" + year + "-" + month + "-" + day + "",
            hotel_id
          );
          //await hotel_unavalible.push(result);
        }
        await console.log("1", year, month, day, result);
        month++;
        day = 1;
      } else if (
        day >= 31 &&
        (month === 1 ||
          month === 3 ||
          month === 5 ||
          month === 7 ||
          month === 8 ||
          month === 10 ||
          month === 12)
      ) {
        const result = await findOneBooking(
          "" + year + "-" + month + "-" + day + "",
          hotel_id
        );
        if (result.length >= numberroom) {
          await hotel_unavalible.push(
            "" + year + "-" + month + "-" + day + "",
            hotel_id
          );
          //await hotel_unavalible.push(result);
        }
        await console.log("2", year, month, day, result);
        if (month === 12) {
          month = 1;
          year = year + 1;
        } else {
          month++;
        }
        day = 1;
      } else if (day >= 28 && month === 2) {
        const result = await findOneBooking(
          "" + year + "-" + month + "-" + day + "",
          hotel_id
        );
        if (result.length >= numberroom) {
          await hotel_unavalible.push(
            "" + year + "-" + month + "-" + day + "",
            hotel_id
          );
          //await hotel_unavalible.push(result);
        }
        await console.log("3", year, month, day, result);
        month++;
        day = 1;
      } else {
        const result = await findOneBooking(
          "" + year + "-" + month + "-" + day + "",
          hotel_id
        );
        if (result.length >= numberroom) {
          await hotel_unavalible.push({
            date: "" + year + "-" + month + "-" + day + "",
            hotel_id: hotel_id,
          });
          //await hotel_unavalible.push(result);
        }
        await console.log("4", year, month, day, result);
        day = day + 1;
      }
      if (i === range.diff("days") - 1) {
        checkloop = true;
        if (hotel_unavalible.length === 0) {
          avalible = true;
        }
        console.log("check4", checkloop);
        console.log("check2", avalible);
        console.log("check3", hotel_unavalible, hotel_unavalible.length);
      }
    }
    return res.json({
      avalible,
      checkloop,
      hotel_unavalible,
    });
  } catch {
    return res.status(422).json({ error: "มีปัญหาบางอย่าง" });
  }
});

router.post("/api/savebooking", requiredLogin, async (req, res) => {
  const {
    check_in,
    check_out,
    hotel_id,
    price_booking,
    user_id,
    booking_adult,
  } = req.body;
  const start = moment(check_in);
  const end = moment(check_out);
  const range = moment.range(start, end);
  console.log(range.diff("days"));
  var timebefore = check_in.split("-");
  var timeafter = check_out.split("-");
  console.log(timebefore, timeafter);
  var checkloop = false;
  var resultsavebyuser;
  try {
    var day = parseInt(timebefore[2]);
    var month = parseInt(timebefore[1]);
    var year = parseInt(timebefore[0]);
    for (var i = 0; i < range.diff("days"); i++) {
      if (
        day >= 30 &&
        (month === 4 || month === 6 || month === 9 || month === 11)
      ) {
        const result = await saveOneBooking(
          "" + year + "-" + month + "-" + day + "",
          hotel_id
        );
        await console.log("1", year, month, day, result);
        month++;
        day = 1;
      } else if (
        day >= 31 &&
        (month === 1 ||
          month === 3 ||
          month === 5 ||
          month === 7 ||
          month === 8 ||
          month === 10 ||
          month === 12)
      ) {
        const result = await saveOneBooking(
          "" + year + "-" + month + "-" + day + "",
          hotel_id
        );
        await console.log("2", year, month, day, result);
        if (month === 12) {
          month = 1;
          year = year + 1;
        } else {
          month++;
        }
        day = 1;
      } else if (day >= 28 && month === 2) {
        const result = await saveOneBooking(
          "" + year + "-" + month + "-" + day + "",
          hotel_id
        );
        await console.log("3", year, month, day, result);
        month++;
        day = 1;
      } else {
        const result = await saveOneBooking(
          "" + year + "-" + month + "-" + day + "",
          hotel_id
        );
        await console.log("4", year, month, day, result);
        day = day + 1;
      }
      if (i === range.diff("days") - 1) {
        checkloop = true;
        resultsavebyuser = await saveBookingUser(
          check_in,
          check_out,
          hotel_id,
          price_booking,
          user_id,
          booking_adult
        );
        await console.log("check4", checkloop, resultsavebyuser);
      }
    }
    return res.json({
      checkloop,
      message: "เทส",
      result: resultsavebyuser,
    });
  } catch {
    return res.status(422).json({ error: "มีปัญหาบางอย่าง" });
  }
});

module.exports = router;
