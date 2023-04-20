const { createDebate, getDebate, updateDebate, deleteDebate, usersDebateCounts } = require("../controller/DebateController")
const router = require("express").Router()

router.post("/", createDebate)
router.get("/", getDebate)
router.get("/counts/:userId", usersDebateCounts)
router.put("/:debateId", updateDebate)
router.delete("/:debateId", deleteDebate)


module.exports = router 