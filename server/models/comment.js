const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    post_id: {
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

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;