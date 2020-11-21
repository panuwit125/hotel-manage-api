const mongoose = require('mongoose')
const hotelSchema = new mongoose.Schema({
    name_hotel:{
        type:String,
        required:true
    },
    detail_hotel:{
        type:String,
        required:true
    },
    image1_hotel:{
        type:String,
        required:true
    },
    image2_hotel:{
        type:String
    },
    image3_hotel:{
        type:String
    },
    price_hotel:{
        type:Number,
        required:true
    },
    map_hotel:{
        type:String,
        required:true
    },
    numberofroom_hotel:{
        type:Number,
        required:true
    },
})

mongoose.model('Hotel',hotelSchema)