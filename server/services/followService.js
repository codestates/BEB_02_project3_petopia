const follow = require("../models/follow.js");

const insertFollow = async(followInfo) => {
    const {followee, follower} = followInfo;
    try {
        const newFollow = new follow({followee: followee, follower: follower});
        await newFollow.save();
        return newFollow;
    } catch (error) {
        throw Error(error);
    }
}

const deleteFollow = async(followInfo) => {
    const {followee, follower} = followInfo;
    try {
        let result = false;
        await follow.deleteOne({followee:followee, follower:follower}).then((res) => {
            if(res.deletedCount > 0) result = true;
        });
        return result;
    } catch (error) {
        throw Error(error);
    }
}

const getFollower = async(id) => {
    try {
       return follow.find({followee:id});
    } catch (error) {
        throw Error(error);
    }
}

module.exports = {
    insertFollow,
    deleteFollow,
    getFollower
}