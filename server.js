const express = require('express');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const {MONGOURI} = require('./key')

app.use(cors())
app.use(express.json())
app.listen(PORT,()=>console.log('Server connected to port',PORT))

require('./models/user')
mongoose.model('User')
app.use(require('./routes/auth'))

mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected',()=>{
    console.log('connected to mongodb successfully')
})
mongoose.connection.on('error',(error)=>{
    console.log('error connection',error)
})