const createService = require('../services/createService.js');

const insertPost = async(req, res) => {
    const postInfo = req.body;
    const post = await createService.insertPost(postInfo);
    
    if(post !== null) {
        return res.status(200).json({ data: post, message: "posting success!" });
    } else {
        return res.status(204).json({ data: null, message: "posting fail!" });
    }
}

module.exports = {
    insertPost
}