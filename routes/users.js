const userController = require("../controllers/user");
const authenticate = require("../middleware/authenticate");
const router = require("express").Router();
router.get("/", authenticate, userController.getUsers);
module.exports = router;
