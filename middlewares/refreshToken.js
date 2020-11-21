const jwt = require('jsonwebtoken')
const {ACCESS_TOKEN_LIFE} = require('../key')
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (req,res,next) => {
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error:"you must be login"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token, ACCESS_TOKEN_LIFE,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"you must be login two"})
        }
        const { _id} = payload
        User.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        }) 
    })
}