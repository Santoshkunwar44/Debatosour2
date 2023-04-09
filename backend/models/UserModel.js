const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "firstName is required"]
    },
    lastName: {
        type: String,
        required: [true, "lastName is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    password: {
        type: String
    },
    avatar: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/8353/8353258.png"
    },
    lastLoggedIn: Number

});

module.exports = mongoose.model("User", UserSchema)

