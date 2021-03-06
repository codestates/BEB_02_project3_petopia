const User = require('../models/user');

const getUserInfoByWallet = async (address) => {
    try {
        return await User.findOne({wallet_address: address});
    } catch (error) {
        throw Error(error);
    }
}

const getUserInfoById = async (userId) => {
    try {
        return await User.findById(userId);
    } catch (error) {
        throw Error(error);
    }
}

const insertUser = async (userInfo) => {
    const {address, image} = userInfo;
    try {
        const newUser = new User({ wallet_address: address, user_name: address, email: null, greetings: null, profile_image: image });
        await newUser.save();
        return newUser;
    } catch (error) {
        throw Error(error);
    }
}

const updateUser = async (userInfo) => {
    const { _id } = userInfo;
    try {
        const updateUser = await User.findByIdAndUpdate(_id, userInfo);
        return updateUser;
    } catch (error) {
        throw Error(error);
    }

}

const getUserList = async (userName) => {
    try {
        return await User.find({ user_name: { $regex: '.*' + userName + '.*',  $options:'i'}});
    } catch (error) {
        throw Error(error)
    }
}

const getUserNames = async (id)  => {
    try {
        return await User.find({_id: {$ne: id}}).select('user_name');
    } catch (error) {
        throw Error(error)
    }
}

module.exports = {
    getUserInfoByWallet,
    getUserInfoById,
    insertUser,
    updateUser,
    getUserList,
    getUserNames
}