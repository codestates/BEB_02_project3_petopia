const userService = require('../services/userService.js');

const login = async (req, res) => {
    const {address} = req.body;
    const user = await userService.getUser(address);

    if(user !== null) {
        return res.status(200).json({ data: user, message: "login success!" });
    } else {
        return res.status(202).json({ data: null, message: "please, sign-up!" });
    }
}

const signup = async (req, res) => {
    const {address} = req.body;
    const user = await userService.insertUser(address);

    if(user !== null) {
        return res.status(200).json({ data: user, message: "success sign-up" });
    } else {
        return res.status(202).json({ data: null, message: "failed sign-up" });
    }
}

const getUserInfo = async (req, res) => {
    const {address} = req.body;
    const user = await userService.getUser(address);

    if(user !== null) {
        return res.status(200).json({ data: user, message: "success!" });
    } else {
        return res.status(202).json({ data: null, message: "fail!" });
    }    
}

const updateUser = async (req, res) => {
    const userInfo = req.body;
    const user = await userService.updateUser(userInfo);

    if(user !== null) {
        return res.status(200).json({ data: user, message: "success!" });
    } else {
        return res.status(202).json({ data: null, message: "fail!" });
    }    
}

module.exports = {
    login,
    signup,
    getUserInfo,
    updateUser
}