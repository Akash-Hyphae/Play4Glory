const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        displayName: {
            type: String,
            required : true,
        },
        email: {
            type: String,
            required : true,
            unique : true
        },
        password: {
            type: String,
            rquired : true,
        },
        inGameName: {
            type: String,
            required : true,
            unique: true
        },
        inGameId: {
            type: Number,
            required: true,
        },   
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("User", userSchema);