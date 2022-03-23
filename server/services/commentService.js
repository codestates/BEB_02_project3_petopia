const comment = require("../models/comment.js")

const insertComment = async(commentInfo) => {
    const {postId, walletAddress, commentDate, contents} = commentInfo;
    try {
        const newComment = new comment({post_id:postId, wallet_address:walletAddress, comment_date:commentDate, contents:contents});
        await newComment.save();
        return newComment;
    } catch (error) {
        throw Error(error);
    }
}


module.exports = {
    insertComment
}