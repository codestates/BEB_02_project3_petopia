const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment_id: {
        type: Number,
        unique: true,
    }, 
    post_id: {
        type: Number,
    },
    user_id: {
        type: String
    },
    date: {
        type: Date,
        defalut: Date.now,
    }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;