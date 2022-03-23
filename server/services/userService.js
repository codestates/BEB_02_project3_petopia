const user = require('../models/user');

const getUser = async (address) => {
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

module.exports = {
    getUser,
    insertUser
}