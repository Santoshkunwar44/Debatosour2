const { createDebate, getDebate, updateDebate } = require("../controller/DebateController")
const router = require("express").Router()

router.post("/", createDebate)
router.get("/", getDebate)
router.put("/:debateId", updateDebate)



module.exports = router 