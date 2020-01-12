const router = require("express").Router();
const userRoutes = require("./users");
const protectedRoutes = require("./protected");

// Protected routes
router.use("/protected", protectedRoutes);

// User routes
router.use("/users", userRoutes);

module.exports = router;


// const router = require("express").Router();

// const userRoutes = require("./users");
// const authRoutes = require("./auth");

// router.use("/users", userRoutes);
// router.use("/auth", authRoutes);

// module.exports = router;
