const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const requiredLogin = require("../middlewares/requiredLogin");
const refreshToken = require("../middlewares/refreshToken");
const multer = require("multer");
const path = require("path");

app.use('/uploads',express.static(path.join(__dirname,'/uploads')))
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/api/upload", upload.single("image"), (req, res) => {
  //console.log(req.file);
  try {
    return res.status(201).json({
      message: "File uploded successfully",
    });
  } catch (error) {
    console.error(error);
  }
});

router.get("/api/imagehotel/:getimage",(req,res)=>{
    var filename = req.params.getimage
    res.sendFile(path.resolve(`./uploads/${filename}`))
})

module.exports = router;
