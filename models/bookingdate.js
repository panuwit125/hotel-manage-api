const mongoose = require('mongoose')
const bookingdateSchema = new mongoose.Schema({
    hotel_id:{
        type:String,
        required:true
    },
    date_booking:{
        type:Date,
        required:true
    }
})

mongoose.model('BookingDate',bookingdateSchema)