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

const Post = mongoose.model("posts", postSchema);

module.exports = Post;