const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const BookingDate = mongoose.model("BookingDate");
const BookingUser = mongoose.model("BookingUser");
//const Hotel = mongoose.model("BookingDate");
const jwt = require("jsonwebtoken");
const requiredLogin = require("../middlewares/requiredLogin");

const saveOneBooking = async (date, hotel) => {
  try {
    //console.log(date, hotel);
    const bookingdate = new BookingDate({
      hotel_id: hotel,
      date_booking: date,
    });
    const result = await bookingdate
      .save()
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
    return result;
  } catch {
    return 500;
  }
};

const saveBookingUser = async (
  check_in,
  check_out,
  hotel_id,
  price_booking,
  user_id,
  booking_adult
) => {
  try {
    console.log(
      check_in,
      check_out,
      hotel_id,
      price_booking,
      user_id,
      booking_adult
    );
    const bookinguser = new BookingUser({
      user_id: user_id,
      hotel_id: hotel_id,
      booking_price: price_booking,
      booking_check_in: check_in,
      booking_check_out: check_out,
      booking_adult: booking_adult,
    });
    const result = await bookinguser
      .save()
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
    return result;
  } catch {
    return 500;
  }
};

module.exports = {
  saveOneBooking,
  saveBookingUser,
};
