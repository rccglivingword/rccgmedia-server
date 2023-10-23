const express = require('express')
const bcrypt = require('bcrypt')
const UserAuth = require('../models/UserAuth')


const userLoginRouter = express.Router()
//  Create an endpoint to get user


userLoginRouter.post('/', async (req, res) => {
    // fetch password from database
    const users = await UserAuth.find()
    const user = users.filter(user => user.username === req.body.username)

    //  compare the inputed with what is in the database
    if (user == null){
        return res.status(400).send('Cannot find user please register')
    }
    try {
        if( await bcrypt.compare(req.body.password, user[0].password)){
           return res.status(201).json("Login successfully")
        } else {
           return res.status(200).send("Access not allowed")
        }
    }catch{
        res.status(500).send()
    }
})


module.exports = userLoginRouter