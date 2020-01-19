// This can be used for any future reference to profiles
// Eg. Tasks related to profiles; user wants to make changes to their profile
module.exports = {
    validateProfile: function(req, res, next) {
      if(!req.profile) {
        res.json({ error: "User is not logged in" });
      }
      else {
        next();
      }
    }
  };