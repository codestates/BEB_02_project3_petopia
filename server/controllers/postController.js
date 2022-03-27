const postService = require('../services/postService.js');

const insertPost = async(req, res) => {
    const postInfo = req.body;
    const post = await postService.insertPost(postInfo);
    
    if(post !== null) {
        return res.status(200).json({ data: post, message: "posting success!" });
    } else {
        return res.status(204).json({ data: null, message: "posting fail!" });
    }
}

const getPostInfo = async(req, res) => {
    const params = {
        tokenId: req.params.id,
        networkType: req.params.type
    }
    const post = await postService.getPostInfo(params);

    if(post !== null) {
        return res.status(200).json({ data: post, message: "success!" });
    } else {
        return res.status(204).json({ data: null, message: "fail!" });
    }
}

module.exports = {
    insertPost,
    getPostInfo
}