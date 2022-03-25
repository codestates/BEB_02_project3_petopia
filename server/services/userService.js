const user = require('../models/user');

const getUserInfo = async (address) => {
    try {
        return user.findOne({wallet_address:address});
    } catch(error) {
        throw Error(error);
    }
}

const insertUser = async (address) => {
    try {
        const newUser = new user({wallet_address:address, user_name:address, email:null, greetings:null, profile_image:null});
        await newUser.save();
        return newUser;
    } catch(error) {
        throw Error(error);
    }
}

const updateUser = async (userInfo) => {
    const {wallet_address} = userInfo;
    try {
        const updateUser = await user.findOneAndUpdate({wallet_address: wallet_address}, userInfo);
        return updateUser;
    } catch (error) {
        throw Error(error);
    }
    
}

const getUserList = async (userName) => {
    try {
        return await user.find({user_name: { $regex: '.*' + userName + '.*' } });
    } catch (error) {
        throw Error(error)
    }
}

const getUser = async (userName) => {
    try {
        return user.findOne({user_name:userName});
    } catch(error) {
        throw Error(error);
    }
}

module.exports = {
    getUser,
    insertUser,
    updateUser,
    getUserList,
    getUser
}