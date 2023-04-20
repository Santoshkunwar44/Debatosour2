const DebateModel = require("../models/DebateModel");

class DebateController {
    async createDebate(req, res) {
        try {
            const savedDebate = await DebateModel.create(req.body)
            res.status(200).json({ message: savedDebate, success: true })

        } catch (error) {
            res.status(500).json({ message: error.message, success: false })
        }
    }
    async getDebate(req, res) {
        let searchQuery = {}
        Object.keys(req.query).forEach(key => {
            if (req.query[key]) {
                searchQuery[key] = req.query[key]
            }
        })
        let fetchedDebate = null;
        try {

            if (req.query.live) {
                fetchedDebate = await DebateModel.find({
                    $and: [
                        { startTime: { $lt: new Date() } },
                        { endTime: { $gt: new Date() } }
                    ]

                }).populate(["admin", "teams.members"])
            } else if (req.query.upcoming) {
                fetchedDebate = await DebateModel.find({
                    startTime: { $gt: new Date() }
                }).populate(['admin', "teams.members"]).sort({ "startTime": 1 })

            } else {
                fetchedDebate = await DebateModel.find({
                    ...searchQuery,
                }).populate(['admin', "teams.members"]).sort({ "startTime": 1 })

            }
            res.status(200).json({ message: fetchedDebate, success: true })

        } catch (error) {
            res.status(500).json({ message: error.message, success: false })
        }
    }


    async updateDebate(req, res) {
        const { debateId } = req.params
        if (!debateId) throw Error("debateId is required")
        try {
            const updatedDebate = await DebateModel.findByIdAndUpdate(debateId, {

                $set: req.body

            }, {
                new: true,
                returnOriginal: false
            })
            res.status(200).json({ message: updatedDebate, success: true })

        } catch (error) {
            res.status(500).json({ message: error.message, sucess: false })
        }
    }

    async deleteDebate(req, res) {
        const { debateId } = req.params
        try {
            await DebateModel.findByIdAndDelete(debateId)
            res.status(200).json({ message: "successfully deleted", success: true })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ message: "Something went wrong", success: false })

        }
    }
    async usersDebateCounts(req, res) {
        const { userId } = req.params;

        try {
            const upcomingDebate = await DebateModel.find({
                admin: userId,
                startTime: { $gt: new Date() }
            }).count()
            const liveDebate = await DebateModel.find({
                admin: userId,
                $and: [
                    { startTime: { $lt: new Date() } },
                    { endTime: { $gt: new Date() } }
                ]
            }).count()
            res.status(200).json({ message: { upcomingDebate, liveDebate }, success: true })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error, success: false })

        }
    }
}
module.exports = new DebateController();
