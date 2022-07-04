const router = require("express").Router();
const authRoute = require("./auth");
router.use("/api/v1/auth", authRoute);

module.exports = router;
