const router = require("express").Router();
const authRoute = require("./auth");
const userRoute = require("./users");
router.use("/api/v1/auth", authRoute);
router.use("/api/v1/users", userRoute);

module.exports = router;
