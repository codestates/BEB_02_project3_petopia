const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    post_id: {
        type: Number,
        unique: true,
    },
    user_id: {
        type: String
    },
    date: {
        type: Date,
        defalut: Date.now,
    }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;