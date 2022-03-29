const followService = require('../services/followService.js');

const insertFollow = async (req, res) => {
    const followInfo = req.body;
    const follow = await followService.insertFollow(followInfo);

    if (follow !== null) {
        return res.status(200).json({ data: follow, message: "follow success!" });
    } else {
        return res.status(204).json({ data: null, message: "follow fail!" });
    }
}

const deleteFollow = async (req, res) => {
    const followInfo = req.body;
    const result = await followService.deleteFollow(followInfo);
    if (result) {
        return res.status(200).json({ data: result, message: "unfollow success!" });
    } else {
        return res.status(204).json({ data: null, message: "unfollow fail!" });
    }
}

<<<<<<< HEAD
const getFollowing = async(req, res) => {
    const id = req.params.id;
    const following = await followService.getFollowing(id);

    if(following !== null) {
=======
const getFollowing = async (req, res) => {
    const id = req.params.id;
    const following = await followService.getFollowing(id);

    if (following !== null) {
>>>>>>> 1c0ecc7 (feat: [client] follow function add / [server] fix typo)
        return res.status(200).json({ data: following, message: "request success!" });
    } else {
        return res.status(204).json({ data: null, message: "request fail!" });
    }

}

<<<<<<< HEAD
const getFollower = async(req, res) => {
=======
const getFollower = async (req, res) => {
>>>>>>> 1c0ecc7 (feat: [client] follow function add / [server] fix typo)
    const id = req.params.id;
    const follower = await followService.getFollower(id);

    if (follower !== null) {
        return res.status(200).json({ data: follower, message: "request success!" });
    } else {
        return res.status(204).json({ data: null, message: "request fail!" });
    }

}

module.exports = {
    insertFollow,
    deleteFollow,
    getFollowing,
    getFollower
}