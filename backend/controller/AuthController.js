const UserModel = require("../models/UserModel");
const { hashPassword, compareHashPassword } = require("../services/AuthService");

class AuthController {


    async register(req, res) {
        const { email, password } = req.body
        try {
            const userExist = await UserModel.findOne({ email });
            if (userExist) {
                throw Error("This email is  already used");
            }
            req.body.lastLoggedIn = Date.now()

            req.body.password = await hashPassword(password);

            const savedUser = await UserModel.create(req.body);
            req.session.user = {
                ...savedUser._doc

            }

            return res.status(200).json({ message: savedUser, success: true })
        } catch (error) {
            return res.status(500).json({ message: error.message, success: false })
        }
    }


    async login(req, res) {
        const { email, password: userPassword } = req.body
        try {
            const userExist = await UserModel.findOne({ email })
            if (!userExist) {
                return res.status(403).json({ message: "This email is not registerd" })
            }
            const { password, _id } = userExist._doc
            const isPasswordValid = await compareHashPassword(userPassword, password)
            const lastLoggedIn = Date.now()
            if (isPasswordValid) {
                await UserModel.findByIdAndUpdate(_id, {
                    lastLoggedIn
                }, {
                    new: true
                })
                req.session.user = {
                    ...userExist._doc,
                    lastLoggedIn
                }
               
                res.status(200).json({ message: { ...userExist._doc, lastLoggedIn }, success: true })
            } else {
                res.status(403).json({ message: "invalid credentails", success: false })
            }


        } catch (error) {
            res.status(500).json({ message: error.message, success: false })
        }
    }


    async logout(req, res) {
        try {
            req.session.destroy(err => {
                if (err) {
                    throw Error(err)
                }
                res.clearCookie("debatosour.sid")
                res.status(200).json({ message: "successfully logged out", success: true })
            })
        } catch (error) {
            res.status(500).json({ message: error.message, success: false })
        }
    }


}
module.exports = new AuthController()