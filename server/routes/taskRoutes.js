const express = require("express");
const jwtVerify = require("../middlewares/authMiddleware");
const { createTask, getAllTasks, updateCard, getAnalytics, deleteTaskCard } = require("../controlllers/taskControllers");
const router = express.Router();

router.post("/create", jwtVerify, createTask);
router.get("/all", jwtVerify, getAllTasks);
router.put("/update/:cardId", jwtVerify, updateCard)
router.get("/analytics", jwtVerify, getAnalytics)
router.delete("/:cardId", jwtVerify, deleteTaskCard)


module.exports = router;