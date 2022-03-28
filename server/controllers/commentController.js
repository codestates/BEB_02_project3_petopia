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

const readAllComment = async(req, res) => {
    const comments = await commentService.getComments(req.params.id)

    if(comments !== null)
    {
        return res.status(200).json({ data: comments, message: "success!" });

    } else{
        return res.status(204).json({ data: null, message: "fail!" });
    }
}

const deleteComment = async(req, res) => {
    const result = await commentService.deleteComment(req.params.id);
    if(result) {
        return res.status(200).json({ data: result, message: "success!" });
    } else {
        return res.status(204).json({ data: null, message: "fail!" });
    }
}

module.exports = {
    insertComment, readAllComment, deleteComment
}