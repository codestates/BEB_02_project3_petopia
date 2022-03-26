const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    followee: {
        type: String,
    },
    follower: {
        type: String
    }
});

const Follow = mongoose.model("Follow", followSchema);

module.exports = Follow;