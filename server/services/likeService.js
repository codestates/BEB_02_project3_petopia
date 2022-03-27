const Like = require("../models/like.js");

const insertLike = async (likeInfo) => {
    const { postId, userId } = likeInfo;
    try {
        const newLike = new Like({ post: postId, user: userId });
        await newLike.save();
        return newLike;
    } catch (error) {
        throw Error(error);
    }
}

const getLikes = async(id) => {
    try {
        return await Like.find({post: id});
    } catch (error) {
        throw Error(error);
    }
}

module.exports = {
    insertLike,
    getLikes
}