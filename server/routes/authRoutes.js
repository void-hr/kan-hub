const express = require("express");
const jwtVerify = require("../middlewares/authMiddleware");
const { registerAccount, loginAccount, updateUserData } = require("../controlllers/authController");
const router = express.Router();

router.post("/register", registerAccount);
router.post("/login", loginAccount);
router.patch("/updateuser", jwtVerify, updateUserData);


module.exports = router;