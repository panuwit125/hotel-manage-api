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

router.post("/api/inserthotel", requiredLogin, (req, res) => {
  const {
    name_hotel,
    detail_hotel,
    image1_hotel,
    image2_hotel,
    image3_hotel,
    price_hotel,
    map_point1_hotel,
    map_point2_hotel,
    province_hotel,
    country_hotel,
    numberofroom_hotel,
  } = req.body;
  if (
    !name_hotel ||
    !detail_hotel ||
    !image1_hotel ||
    !price_hotel ||
    !map_point1_hotel ||
    !map_point2_hotel ||
    !province_hotel ||
    !country_hotel ||
    !numberofroom_hotel
  ) {
    return res.status(422).json({ error: "กรุณากรอกข้อมูลให้ครบ" });
  }
  Hotel.findOne({ name_hotel: name_hotel })
    .then((result) => {
      if (result) {
        return res.status(422).json({ error: "ชื่อโรงแรมนี้มีอยู่แล้ว" });
      } else {
        const hotel = new Hotel({
          name_hotel,
          detail_hotel,
          image1_hotel,
          image2_hotel,
          image3_hotel,
          price_hotel,
          map_point1_hotel,
          map_point2_hotel,
          province_hotel,
          country_hotel,
          numberofroom_hotel,
        });
        hotel
          .save()
          .then((result) => {
            res.json(result);
          })
          .catch((error) => {
            res.status(422).json(error);
          });
      }
    })
    .catch((error) => {
      return res.status(422).json({ error: "หาโรงแรมผิดพลาด" });
    });
});

router.get("/api/getdatahotel", (req, res) => {
  Hotel.find().then((result) => {
    if (result) {
      res.json(result);
    } else {
      res.status(422).json({ message: "ไม่พบข้อมูล" });
    }
  });
});

router.get("/api/getdatahotel/:idhotel", (req, res) => {
  console.log(req.params.idhotel)
  var idhotel = req.params.idhotel
  if (!idhotel) {
    return res.status(422).json({error:"ไม่มี id ชื่อโรงแรม"})
  }
  Hotel.findOne({ _id: idhotel }).then((result)=>{
    if(result){
      res.json(result)
    } else {
      res.status(422).json({error:"ไม่พบโรงแรม"})
    }
  }).catch((error)=>{
    return res.status(422).json({error:"มีปัญหาผิดพลาดขณะตรวจสอบข้อมูล"})
  })
});

module.exports = router;
