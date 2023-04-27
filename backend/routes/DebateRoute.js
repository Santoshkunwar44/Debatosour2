const { createDebate, getDebate, updateDebate, getSingleDebate, deleteDebate  ,removeParticipant,joinedParticipant, usersDebateCounts } = require("../controller/DebateController")
const router = require("express").Router()

router.post("/", createDebate)
router.get("/", getDebate)
router.get("/singleDebate/:debateId", getSingleDebate)
router.get("/counts/:userId", usersDebateCounts)
router.put("/:debateId", updateDebate)
router.delete("/:debateId", deleteDebate)
router.post("/joinParticipant/:debateId",joinedParticipant)
router.post("/removeParticipant/:debateId",removeParticipant)


module.exports = router 