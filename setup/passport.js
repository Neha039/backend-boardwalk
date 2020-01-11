const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userController = require('../controllers/usersController');
const session = require('express-session');

module.exports = function(app) {
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // used to serialize the user for the session
  // Start the session (login)
  passport.serializeUser(function(username, done) {
    done(null, username);
  });

  // used to deserialize the user from the session
  // Return the user whose session belonged to
  passport.deserializeUser(function(username, done) {
    userController.findOneByUsername(username, done)
  })

  // Route to login
  passport.use("login", new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    }, 
    function(username, password, done) {
      userController.signIn( {user: username, password: password}, 
        (error, username) => done(error, username));
    }
  ));
}