require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const memberRouter = require('./routes/Members')
const userRouter = require('./routes/User')
const userLoginRouter = require('./routes/Login')
const cors = require('cors')
const { logger } = require('./middleware/logger')
const corsOptions = require('./config/corsOptions')
const errorHandler = require('./middleware/errorHandler')

const server = express()
server.use(logger)


let root = require('path').join(__dirname, 'build')


mongoose.connect(
    process.env.DATABASE_URI, { useNewUrlParser:true }
    );
const db = mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open',()=> console.log('connected to Database'))

server.use(cors(corsOptions))
server.use(express.json())


server.use('/register', memberRouter)
server.use('/users', userRouter)
server.use('/users/login', userLoginRouter)

// app.use('/users', userRouter)



server.use(errorHandler)

server.listen(3001, () => {
    console.log("Server is running perfectly")
});