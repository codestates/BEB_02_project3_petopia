const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    wallet_address: {
        type:String
    },
    post_id: {
        type:String
    }
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;