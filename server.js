const express = require("express");
var morgan = require('morgan')
const passportSetup = require("./setup/passport");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
// require('dotenv').config()

// Define middleware here
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add Passport
passportSetup(app);

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI ||  'mongodb://localhost/boardwalktest',
  // process.env.MONGODB_URI ||  'mongodb://boardwalkdb@ds135724.mlab.com:35724/heroku_v0wj9l6z',
);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});