const express = require("express");
const { registerAccount } = require("../controlllers/authController");
const router = express.Router();

router.post("/register", registerAccount);
// router.post("/login", loginAccount);

module.exports = router;