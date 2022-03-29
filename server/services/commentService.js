const Comment = require("../models/comment.js")

const insertComment = async(commentInfo) => {
    const {postId, userId, commentDate, contents} = commentInfo;
    try {
        const newComment = new Comment({post:postId, user:userId, comment_date:commentDate, contents:contents});
        await newComment.save();
        return await Comment.findById(newComment._id).populate('user').exec();
    } catch (error) {
        throw Error(error);
    }
}

const getComments = async(id) => {
    try {
        return await Comment.find({post:id}).populate('user').exec();
    } catch (error) {
        throw Error(error);
    }
}

const deleteComment = async(id) => {
    try {
        let result = false;
        await Comment.findByIdAndDelete(id).then((res) => {
            if(res.deletedCount > 0) result = true;
        });
        return result;
    } catch (error) {
        throw Error(error);
    }
}

module.exports = {
    insertComment,
    getComments,
    deleteComment
}