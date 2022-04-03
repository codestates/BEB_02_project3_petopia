const Post = require("../models/post.js");

const insertPost = async(postInfo) => {
    const {tokenId, userId, postDate, networkType} = postInfo;
    try {
        const newPost = new Post({token_id:tokenId, user:userId, post_date:postDate, network_type:networkType, isDelete:false});
        await newPost.save();
        return newPost;
    } catch (error) {
        throw Error(error);
    }
}

const getPostInfo = async(params) => {
    const {tokenId, networkType} = params;
    try {
        return await Post.findOne({token_id:tokenId, network_type:networkType}).populate('user').exec();
     } catch (error) {
         throw Error(error);
     }
}

const getAllPostInfo = async(params) => {
    const { networkType} = params;
    try {
        return await Post.find({network_type:networkType}).populate('user').exec();
     } catch (error) {
         throw Error(error);
     }
}

const deletePost = async(id) => {
    try {
        return await Post.findByIdAndUpdate({id}, {isDelete:true});
    } catch (error) {
        throw Error(error);
    }
}

module.exports = {
    insertPost,
    getPostInfo,
    getAllPostInfo,
    deletePost
}