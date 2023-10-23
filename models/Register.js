const mongoose = require('mongoose');

const regSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true

    },
    lastName :{
        type:String,
        required: true

    },
    birthday : {
        type: Date,
        required: true
        },

    wedding : {
        type: Date,
        required: false
    },
    consent: {
        type: Boolean,
        required: true
    },
    RegisterDate: {
        type: Date,
        required: true,
        default: Date.now

    }

    
});

const register = mongoose.model("register", regSchema)

module.exports  = register