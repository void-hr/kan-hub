const express = require("express");
const jwtVerify = require("../middlewares/authMiddleware");
const { createTask, getAllTasks, updateCard, getAnalytics, deleteTaskCard, getTaskCard } = require("../controlllers/taskControllers");
const router = express.Router();

router.post("/create", jwtVerify, createTask);
router.get("/all", jwtVerify, getAllTasks);
router.put("/update/:cardId", jwtVerify, updateCard)
router.get("/analytics", jwtVerify, getAnalytics)
router.delete("/:cardId", jwtVerify, deleteTaskCard)
router.get("/:cardId",  getTaskCard)



module.exports = router;