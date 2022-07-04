const router = require("express").Router();
const { registerController } = require("../controllers/auth");
router.post("/register", registerController);

module.exports = router;
