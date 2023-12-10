const express = require("express");
const router = express.Router();
const registerUser = require("../controller/registerController");
const loginUser = require("../controller/loginController")

router.post("/login", loginUser);
router.post("/signup", registerUser);

module.exports = router;
