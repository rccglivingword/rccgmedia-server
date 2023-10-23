const express = require('express')
const router = express.Router()

// const User = require('../models/User')
const Register = require('../models/Register')

// Getting all
router.get('/', async (req, res)=>{
    try{
        const register = await Register.find()
        res.json(register)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }

})
// Getting one
router.get('/:id', getMember, (req, res) => {
    res.json(res.member)

})
//  Creating one 
router.post('/', async (req, res) => {
    const register = new Register({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        birthday: req.body.birthday,
        wedding: req.body.wedding,
        consent: req.body.consent
        
    })
    try {
        const newRegister = await register.save()
        res.status(201).json({ message: "Submission Successfull"})
    }catch (err) {
        res.status(400).json({ message: err.message })

    }


})
//  updating one 
router.patch('/:id', getMember, async(req, res) => {
    if (req.body.name != null){
        res.member.name = req.body.name
    }
    if (req.body.age != null) {
        res.member.name = req.body.age
    }
    try{
        const updatedmember = await res.member.save()
        res.json(updatedmember)
    } catch (err){
        res.status(400).json({message: err.message})
        

    }
})

// Deleting one 

router.delete('/:id', getMember, async (req, res) => {
    try{
        await res.member.deleteOne()
        res.json({message: "Member was deleted"})
    } catch (err) {
        res.status(500).json({message: err.message})
    }

})


async function getMember(req,res, next){
    let member
    try{
        member = await User.findById(req.params.id)
        if (member === null) {
            return res.status(404).json ({ message: "Cannont find user"})
        }
    } catch (err){
        return res.status(500).json({ message: err.message})

    }

    res.member = member
    next()

}


module.exports = router