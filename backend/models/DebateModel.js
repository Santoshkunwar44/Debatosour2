
const mongoose = require("mongoose")


const User = {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",

    required: true
}


const Team = {

    members: [User],
    vote: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        required: [true, "team name is required"]
    },

    win: {
        type: String,
        default: 0
    },
    lose: {
        type: String,
        default: 0
    },



}

const MongooseSchema = mongoose.Schema({
    topic: {
        type: String,
        unique:true,
        required: [true, "Debate title 'title' is required"],
        min: [5, "Title should be at least 5 characters long"],
        max: [100, "Title should be at most 100 characters long"]
    },
    participantsCount: {
        type: Number,
        required: ["Number of Participants 'participantsCount'  is required"]
    },
   
    admin: User,
    startTime: {
        type: Number, // milliseconds
        required: [true, "starting time is required"]
    },
    endTime: {
        type: Number, // milliseconds
        required: [true, "endTime time is required"]
    },

    duration: {
        type: Number, // milliseconds
        required: [true, "Duration  is required"]
    },
    teams: [
        Team,
    ],
    timeFormat:Object,
    joinedParticipants:[ User],
    type: {
        type: String,
        required: [true, 'debate type is required']
    }
},{timestamps:true})
module.exports = mongoose.model("Debate", MongooseSchema)