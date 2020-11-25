const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const BookingDate = mongoose.model("BookingDate");
//const Hotel = mongoose.model("BookingDate");
const jwt = require("jsonwebtoken");
const requiredLogin = require("../middlewares/requiredLogin");

const findOneBooking = async (date, hotel) => {
  try {
    //console.log(date, hotel);
    const result = await BookingDate.find({
      hotel_id: hotel,
      date_booking: date,
    }).then((result) => {
      if (result) {
        console.log("Found");
        return result;
      } else {
        console.log("Not found");
        return result;
      }
    });
    return result;
  } catch {
    return 500;
  }
};

module.exports = {
  findOneBooking,
};
