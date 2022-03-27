const likeService = require('../services/likeService.js');

const insertLike = async(req, res) => {
    const likeInfo = req.body;
    const like = await likeService.insertLike(likeInfo);

    if(like !== null) {
        return res.status(200).json({ data: like, message: "success!" });
    } else {
        return res.status(204).json({ data: null, message: "fail!" });
    }
}

const getLikes = async(req, res) =>{
    const likes = await likeService.getLikes(req.params.id);
    
    if(likes !== null){
        return res.status(200).json({ data: likes, message: "success!" });
    } else {
        return res.status(204).json({ data: null, message: "fail!" });
    }
}

module.exports = {
    insertLike,
    getLikes
}