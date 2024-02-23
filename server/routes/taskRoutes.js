const express = require("express");
const { createTask } = require("../controlllers/taskControllers");
const router = express.Router();

router.post("/create", createTask);
// router.post("/login", loginAccount);

module.exports = router;