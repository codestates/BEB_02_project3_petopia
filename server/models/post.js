const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    post_id: {
        type: Number,
        unique: true,
    },
    wallet_address: {
        type: String
    },
    post_date: {
        type: Date,
        defalut: Date.now,
    }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;