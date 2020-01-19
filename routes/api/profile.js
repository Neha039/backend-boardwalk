const profileUtils = require('../../utils/profileMethods');
const router = require("express").Router();
const profileController = require("../../controllers/profileController");

// Matches with "/api/users"
router.route("/")
  .get(profileController.findAll);

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(profileController.findById);

// Matches with "api/users/find/currentUser"
// router
//   .route("/find/currentUser")
//   .get(profileUtils.validateProfile, usersController.findCurrentUser)
//   .put(profileUtils.validateProfile, usersController.update)
//   .delete(profileUtils.validateProfile, usersController.remove);

// module.exports = router;  
