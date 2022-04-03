const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    token_id: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    post_date: {
        type: Date,
        defalut: Date.now,
    },
    network_type: {
        type: String
    },
    isDelete: {
        type: Boolean
    }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;