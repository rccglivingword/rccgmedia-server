const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        require: true
    },
    submittedDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const users_auth = mongoose.model("user_auth", UserSchema)

module.exports = users_auth