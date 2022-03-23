const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
    comment_id: {
        type: Number,
    },
    wallet_address: {
        type: String
    },
    comment_date: {
        type: Date,
        defalut: Date.now,
    },
    contents: {
        type: String
    }
});

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;