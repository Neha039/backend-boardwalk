const User = require('../models/user');

const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/boardwalk"
);

const users = [
  new User({
    username: "UserNumberOne",
    password: "PasswordOne",
    email: "User@user.com",
  }),
  new User({
    username: "UserNumberTwo",
    password: "PasswordTwo",
    email: "User2@user.com",
  }),
  new User({
    username: "UserNumberThree",
    password: "PasswordThree",
    email: "User3@user.com",
  })
];



async function seedAndDisconnect(data) {
  data.forEach(i => i.save())
}

seedAndDisconnect(users).then(mongoose.disconnect());