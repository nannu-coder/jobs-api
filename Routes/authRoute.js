const router = require("express").Router();
const { login, register } = require("../Controllers/authController");

router.post("/login", login);
router.post("/register", register);

module.exports = router;
