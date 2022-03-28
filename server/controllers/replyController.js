const replyService = require('../services/replyService.js');

const insertReply = async(req, res) => {
    const replyInfo = req.body;
    const reply = await replyService.insertReply(replyInfo);
    
    if(reply !== null) {
        return res.status(200).json({ data: reply, message: "success!" });
    } else {
        return res.status(204).json({ data: null, message: "fail!" });
    }
}

const getReplies = async(req, res) => {
    const replies = await replyService.getReplies(req.params.id)

    if(replies !== null)
    {
        return res.status(200).json({ data: replies, message: "success!" });

    } else{
        return res.status(204).json({ data: null, message: "fail!" });
    }
}

const deleteReply = async(req, res) => {
    const result = await replyService.deleteReply(req.params.id);
    if(result) {
        return res.status(200).json({ data: result, message: "success!" });
    } else {
        return res.status(204).json({ data: null, message: "fail!" });
    }
}

module.exports = {
    insertReply, getReplies, deleteReply
}