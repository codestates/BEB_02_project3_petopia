const commentService = require('../services/commentService.js');

const insertComment = async(req, res) => {
    const commentInfo = req.body;
    const comment = await commentService.insertComment(commentInfo);
    
    if(comment !== null) {
        return res.status(200).json({ data: comment, message: "Comment success!" });
    } else {
        return res.status(204).json({ data: null, message: "Comment fail!" });
    }
}

module.exports = {
    insertComment
}