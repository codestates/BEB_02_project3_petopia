const Reply = require("../models/reply.js")

const insertReply = async(replyInfo) => {
    const {commentId, userId, replyDate, contents} = replyInfo;
    try {
        const newReply = new Reply({comment:commentId, user:userId, reply_date:replyDate, contents:contents});
        await newReply.save();
        return await Reply.findById(newReply._id).populate('user').exec();
    } catch (error) {
        throw Error(error);
    }
}

const getReplies = async(id) => {
    try {
        console.log(await Reply.find({comment:id}).populate('user').exec())
        return await Reply.find({comment:id}).populate('user').exec();
    } catch (error) {
        throw Error(error);
    }
}

const deleteReply = async(id) => {
    try {
        let result = false;
        await Reply.findByIdAndDelete(id).then((res) => {
            if(res.deletedCount > 0) result = true;
        });
        return result;
    } catch (error) {
        throw Error(error);
    }
}

module.exports = {
    insertReply,
    getReplies,
    deleteReply
}