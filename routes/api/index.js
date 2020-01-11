const router = require("express").Router();

const userRoutes = require("./users");
const authRoutes = require("./auth");
const profileRoutes = require("./profile");

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);

module.exports = router;
