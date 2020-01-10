const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
        // unique username
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);