const mongoose = require('mongoose')
const bookinguserSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    hotel_id:{
        type:String,
        required:true
    },
    booking_price:{
        type:Number,
        required:true
    },
    booking_check_in:{
        type:Date,
        required:true
    },
    booking_check_out:{
        type:Date,
        required:true
    },
    booking_adult: {
        type:Number,
        required:true
    }
})

mongoose.model('BookingUser',bookinguserSchema)