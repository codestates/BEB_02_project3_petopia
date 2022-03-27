const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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