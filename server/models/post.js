const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    token_id: {
        type: Number,
        unique: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    post_date: {
        type: Date,
        defalut: Date.now,
    }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;