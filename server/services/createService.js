const post = require("../models/post.js")

const insertPost = async(postInfo) => {
    const {postId, walletAddress, postDate} = postInfo;
    try {
        const newPost = new post({post_id:postId, wallet_address:walletAddress, post_date:postDate});
        await newPost.save();
        return newPost;
    } catch (error) {
        throw Error(error);
    }
}


module.exports = {
    insertPost
}