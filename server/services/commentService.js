const comment = require("../models/comment.js")

const insertComment = async(commentInfo) => {
    const {postId, userId, commentDate, contents} = commentInfo;
    try {
        const newComment = new comment({post:postId, user:userId, comment_date:commentDate, contents:contents});
        await newComment.save();
        return newComment;
    } catch (error) {
        throw Error(error);
    }
}

module.exports = {
    insertComment
}