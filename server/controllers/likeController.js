const likeService = require('../services/likeService.js');
const like = require('../models/like')

const insertLike = async(req, res) => {
    const likeInfo = req.body;
    const like = await likeService.insertLike(likeInfo);
    
    console.log('like insert')

    if(like !== null) {
        return res.status(200).json({ data: like, message: "Like success!" });
    } else {
        return res.status(204).json({ data: null, message: "Like fail!" });
    }
}

const readAll = async(req, res) =>{
    
    const likeAll = await like.find();
    
    console.log('loadAll like')

    if(likeAll !== null){
        return res.status(200).json({ data: likeAll, message: "Like success!" });
    } else {
        return res.status(204).json({ data: null, message: "Like fail!" });
    }

    
}

module.exports = {
    insertLike, readAll
}