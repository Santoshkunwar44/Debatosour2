const UserModel = require("../models/UserModel");
const { isUserUpdated } = require("../services/AuthService");

class UserController {
    async addUser(req, res) {
        const { email } = req.body

        try {
            const userExist = await UserModel.findOne({ email });
            if (userExist) {
                throw Error("This email is  already used");
            }
            const savedUser = await UserModel.create(req.body)
            return res.json({ message: savedUser, success: true })


        } catch (error) {
            return res.json({ message: error.message, success: false })
        }
    }
    async updateUser(req, res) {
        const { userId } = req.params;
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(userId, {
                $set: req.body
            }, {
                new: true,

            })
            res.status(200).json({ message: updatedUser, success: true })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error, success: false })
        }
    }

    async deleteUser(req, res) {
        const { userId } = req.params;
        try {
            await UserModel.findByIdAndDelete(userId)
            res.status(200).json({ message: "User deleted successfully", success: true })
        } catch (error) {
            res.status(500).json({ message: error, success: false })
        }
    }

    async getLoggedInUser(req, res) {
        const sessionUser = req.session?.passport?.user || req.session.user;

        if (sessionUser) {
            let updatedUser = await isUserUpdated(sessionUser)
            console.log(updatedUser)
            return res.status(200).json({ message: updatedUser, success: true })
        } else {

            return res.status(403).json({ message: "You are not logged in", success: false })
        }
    }

    async searchUser(req, res) {
        const { userId } = req.query
        let keyword = {}
        try {
            if (!userId) {

                keyword = req.query.search_query ? {
                    $or: [
                        { firstName: { $regex: req.query.search_query, $options: "i" } },
                        { lastName: { $regex: req.query.search_query, $options: "i" } },
                        { email: { $regex: req.query.search_query, $options: "i" } },
                    ]
                } : {}

            } else {
                keyword = { _id:  userId   }
            }
            const fetchedUser = await UserModel.find(keyword)
            res.status(200).json({ message: fetchedUser, success: true })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error, success: false })
        }
    }

}
module.exports = new UserController()