const authUtils = require('../../utils/authMethods');
const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router.route("/")
  .get(usersController.findAll);

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(usersController.findById);

// Matches with "api/users/find/currentUser"
router
  .route("/find/currentUser")
  .get(authUtils.validateLogin, usersController.findCurrentUser)
  .put(authUtils.validateLogin, usersController.update)
  .delete(authUtils.validateLogin, usersController.remove);

module.exports = router;