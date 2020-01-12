const router = require("express").Router();

//Require our configured passport
const passport = require("../../config/passport");

// Login Route
// Matches with "/auth/login"

router
    .route("/login")
    .post(passport.authenticate('local'), (req, res) => {
        res.json(req.user);
    });

// Logout Route
// Matches with "/auth/logout"
router.route("/logout")
    .get((req, res) => {
        req.logOut(); //destroy the current login info
        res.sendStatus(200);
    });

router.route("/whoami")
    .get((req, res)=> {
        res.json(req.user || null);
    });

module.exports = router;

// const router = require("express").Router();
// var passport = require('passport');
// var userController = require('../../controllers/usersController');

// // Matches with /api/auth/test
// router.get("/test", (req, res) => {
//   res.json({user: req.user, message: (req.user) ? "User session active" : "no session active"})
// })

// // Matches with /api/auth/login
// // Passport Documentation: http://www.passportjs.org/docs/authenticate/
// router.post("/login", 
// passport.authenticate('login', { failWithError: true}),
// (req, res) => res.json({user: req.user, message:"logged in"}),
// (error, req, res, next) => {
//   res.json({ error: error.message});
// });

// // Matches with /api/auth/signup
// router.post("/signup", (req, res, next) => {
//   userController.signUp( req.body, (error) => {
//     if(error) { 
//       res.json({ error: error.message });
//     } 
//     else {
//       next();
//     }
//   });
// }, passport.authenticate('login'), 
// (req, res) => res.json({user: req.user, message:"signed up"}));

// // Matches with /api/auth/logout
// router.get("/logout", (req, res) => {
//   req.session.destroy(() => (res.json({ user: req.user, message:"logged out"} )));
// })

// module.exports = router;