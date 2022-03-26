const likeService = require('../services/likeService.js');

const insertLike = async(req, res) => {
    const likeInfo = req.body;
    const like = await likeService.insertLike(likeInfo);
    
    if(like !== null) {
        return res.status(200).json({ data: like, message: "Like success!" });
    } else {
        return res.status(204).json({ data: null, message: "Like fail!" });
    }
}

const readAll = async(req, res) =>{
    
    const likeAll = await like.find();
        
    if(likeAll !== null){
        return res.status(200).json({ data: likeAll, message: "Like success!" });
    } else {
        return res.status(204).json({ data: null, message: "Like fail!" });
    }

    
}

module.exports = {
    insertLike, readAll
}