const commentService = require('../services/commentService.js');
const comment = require('../models/comment')

const insertComment = async(req, res) => {
    const commentInfo = req.body;
    const comment = await commentService.insertComment(commentInfo);
    
    console.log('insert comment');

    if(comment !== null) {
        return res.status(200).json({ data: comment, message: "Comment success!" });
    } else {
        return res.status(204).json({ data: null, message: "Comment fail!" });
    }
}

const readAllComment = async(req, res) =>{
    const commentAll = await comment.find();

    console.log('loadAll comment');

    if(commentAll !== null)
    {
        return res.status(200).json({ data: commentAll, message: "Like success!" });

    } else{
        return res.status(204).json({ data: null, message: "Like fail!" });
    }
}

module.exports = {
    insertComment, readAllComment
}