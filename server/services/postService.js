const Post = require("../models/post.js");

const insertPost = async(postInfo) => {
    const {tokenId, userId, postDate, networkType} = postInfo;
    try {
        const newPost = new Post({token_id:tokenId, user:userId, post_date:postDate, network_type:networkType});
        await newPost.save();
        return newPost;
    } catch (error) {
        throw Error(error);
    }
}

const getPostInfo = async(params) => {
    const {tokenId, networkType} = params;
    try {
        return Post.findOne({token_id:tokenId, network_type:networkType}).populate('user').exec();
     } catch (error) {
         throw Error(error);
     }
}

module.exports = {
    insertPost,
    getPostInfo
}