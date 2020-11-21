const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    user_name:{
        type:String,
        required:true
    },
    pass_word:{
        type:String,
        required:true
    },
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email_user:{
        type:String,
        required:true
    },
    birdday_user:{
        type:Date,
        required:true
    },
})

mongoose.model('User',userSchema)