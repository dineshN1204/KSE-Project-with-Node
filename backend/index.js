const express = require('express')
const users = require('./routes/users')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/users')
mongoose.connection.on('connected',()=>{
    console.log('MongoDB is successfully connected');
})

const app = express()
app.use(cors())
app.use('/users',users)
app.get('/',(req,res)=>{
    res.send('Home Page')
})
app.listen(3001,()=>{
    console.log('Server is running on port 3001');
})
