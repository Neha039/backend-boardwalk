//using bcrypt for hashing
const bcrypt = require("bcryptjs");

//Require our user model
const User = require("../models/user");

module.exports = {
    findAll: async function (req, res) {
        try {
            const results = await User.find({});
            res.status(200).json(results);
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    findById: async function (req, res) {
        try {
            const result = await User.findById(req.params.id);
            if (!result) {
                return res.sendStatus(404); //we didn't actually find anybody!
            }
            res.status(200).json(result);
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    create: async function (req, res) {
        try {
            //create a new user!
            //BUT FIRST!  validation (8
            const { email, password } = req.body;
            if (typeof email !== "string" || email === "") {
                return res.status(400).json({ error: "Must provide an email address!" });
            }

            if (typeof password !== "string" || password.length < 8 || password.length > 64) {
                return res.status(400).json({ error: "Must provide a password (8-64 characters)!" });
            }

            //Now that we have valid input, we have to protect our password
            //(Note: this work can also live in the user schema; it is shown here so that we can trace what's going on)
            const salt = await bcrypt.genSalt(10);
            const saltedAndHashedPwd = await bcrypt.hash(password, salt);

            //Finally, we create the new user:
            const newUser = await User.create({ email: email, password: saltedAndHashedPwd });
            
            //And now, we log them in!
            req.login(newUser, err => {
                if(err) { throw err };
                res.json(req.user); 
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};

// const db = require("../models");

// // Defining methods for the usersController
// module.exports = {
//   findAll: function(req, res) {
//     db.User
//       .find(req.query)
//       .sort({ date: -1 })
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   findById: function(req, res) {
//     db.User
//       .findById(req.params.id)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   create: function(req, res) {
//     db.User
//       .create(req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   // ====== FIND CURRENT USER: current session logged in by the user ======
//   findCurrentUser: function(req, res ) {
//     db.User
//       .findById(req.user._id)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },

//   signUp: function(body, callback) {
//     //copy the body to the user
//     const user = Object.assign({}, body)

//     db.User
//       // Find username from the database
//       .findOne({ username: user.username })
//       .then((dbModel) => {
//         // If username exists in database
//         if(dbModel){
//           // Prompt user to choose another username
//           // This is corresponds to the (error, username)
//           callback({ message: "Username already exists." }, null );
        
//         // Else username has not been used
//         } else {
//           // Password encryption
//           let salt = bcrypt.genSaltSync(7);
//           user.password = bcrypt.hashSync(user.password, salt)

//           // Create new username and password
//           db.User.create(user)
//           .then(dbModel => { 
//             callback(null, dbModel.username);
//           }).catch(err => {
//             callback(err, null)
//           });
//         }
//       })
//       .catch(err => callback(err, null));
//   },

//   // ====== SIGN-IN ====== 
//   signIn: function(body, callback) {
//     const { user, password } = body;
//     db.User
//       .findOne({ username: user })
//       .then((dbModel) => {
//         if(dbModel){
//           if ( bcrypt.compareSync(password, dbModel.password) ){
//             callback(null, dbModel.username);
//           }
//           else {
//             callback({ message: "Incorrect Password" }, null);
//           }
//         }
//         else { 
//           callback({message: "Username does not exist." }, null);
//         }
//       })
//       .catch(err => callback(err, null));
//   },

//   // ====== UPDATE CURRENT USER'S ACCOUNT ====== 
//   update: function(req, res) {
//     // updating new password
//     // if there is new password from the body of the request
//     // ie. new password value filled in by the user
//     if(req.body.password) {
//       // Add salt for extra security
//       let salt = bcrypt.genSaltSync(7);
//       // new password is now stored as the encrypted password with salt
//       req.body.password = bcrypt.hashSync(req.body.password, salt)
//     }

//     db.User
//       // find user by the id and update the req body with new properties
//       .findOneAndUpdate({ _id: req.user._id }, req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },

//   // ====== REMOVE CURRENT USER'S ACCOUNT ====== 
//   remove: function(req, res) {
//     db.User
//       .findOneAndDelete({ _id: req.user._id })
//       .then(() => {
//         req.session.destroy(() => {
//           res.json({ user: req.user, message: "deleted account and logged out "} );
//         });
//       })
//       .catch(err => res.status(422).json(err));
//   }
// };