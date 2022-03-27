const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Follow = mongoose.model("Follow", followSchema);

module.exports = Follow;