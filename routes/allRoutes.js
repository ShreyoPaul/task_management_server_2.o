const express = require("express")
const { signup, login } = require("../controllers/authController.js")
const { getTask, postTask, getAllUsers, updateTask } = require("../controllers/taskController.js")
const { authenticateToken } = require("../utils/authentication.js")

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)

router.get("/", authenticateToken, getAllUsers)
router.get("/task", getTask)
router.post("/task", authenticateToken, postTask)
router.patch("/:id", authenticateToken, updateTask)


module.exports = router

