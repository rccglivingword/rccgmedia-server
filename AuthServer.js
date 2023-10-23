require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require('./routes/User');
const userLoginRouter = require('./routes/Login')


const app = express()

const cors = require('cors')


mongoose.connect(
    process.env.DATABASE_URI, { useNewUrlParser:true }
    );
const db = mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open',()=> console.log('connected to Database'))

app.use(cors())

app.use(express.json())


app.use('/users', userRouter)
app.use('/users/login', userLoginRouter)



app.listen(4000, () => {
    console.log("Authentication Server is running perfectly")
});