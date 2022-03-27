const post = require("../models/post.js");

const insertPost = async(postInfo) => {
    const {tokenId, userId, postDate} = postInfo;
    try {
        const newPost = new post({token_id:tokenId, user:userId, post_date:postDate});
        await newPost.save();
        return newPost;
    } catch (error) {
        throw Error(error);
    }
}

module.exports = {
    insertPost
}