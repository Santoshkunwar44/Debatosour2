const router = require("express").Router()

const OpenAiApi = require("openai").OpenAIApi

router.post("/completion", async (req, res) => {
    try {
        const prompt = req.body.prompt ;


    } catch (error) {
        console.log(error)
    }
})


module.exports = router