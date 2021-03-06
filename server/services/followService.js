const Follow = require("../models/follow.js");

const insertFollow = async (followInfo) => {
    const { followee, follower } = followInfo;
    try {
        const newFollow = new Follow({ followee: followee, follower: follower });
        await newFollow.save();
        return newFollow;
    } catch (error) {
        throw Error(error);
    }
}

const deleteFollow = async (followInfo) => {
    const { followee, follower } = followInfo;
    try {
        let result = false;
        await Follow.deleteOne({ followee: followee, follower: follower }).then((res) => {
            if (res.deletedCount > 0) result = true;
        });
        return result;
    } catch (error) {
        throw Error(error);
    }
}

const getFollowing = async (id) => {
    try {
        return Follow.find({ followee: id }).populate('follower').exec();
    } catch (error) {
        throw Error(error);
    }
}

const getFollower = async (id) => {
    try {
        return Follow.find({ follower: id }).populate('followee').exec();
    } catch (error) {
        throw Error(error);
    }
}

const bothDeleteFollow = async (followInfo) => {
    const { followee, follower } = followInfo;
    try {
        let result = false;
        await Follow.deleteOne({ followee: followee, follower: follower }).then(async(res) => {
            if (res.deletedCount > 0) {
                await Follow.deleteOne({followee: follower, follower: followee});
                result = true;
            }
        });
        return result;
    } catch (error) {
        throw Error(error);
    }
}

module.exports = {
    insertFollow,
    deleteFollow,
    getFollowing,
    getFollower,
    bothDeleteFollow
}