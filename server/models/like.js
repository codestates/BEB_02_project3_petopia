const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    user_id: String,
    post_id: String
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;