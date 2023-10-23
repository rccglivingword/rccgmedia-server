const express = require('express')
const bcrypt = require('bcrypt')
const Users_auth = require('../models/UserAuth')

const userRouter = express.Router()

//  Create an endpoint to get user


userRouter.post('/', async (req, res) => {
    try{
        // const salt =  await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(
            req.body.password, 10)

        const newUser = new Users_auth ({
            username: req.body.username,
            password: hashedPassword
        })
        await newUser.save()
        res.status(201).send("Submitted")
    } catch (err) {
        res.status(500).json({message: err.message})

    }

})

userRouter.get("/", async (req, res) => {
    try{
        const users = await Users_auth.find()
        res.status(201).json(users)

    }catch(err){
        res.status(500).json({message: err.message})

    }

})


module.exports = userRouter