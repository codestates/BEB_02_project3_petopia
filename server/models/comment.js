const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
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

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;