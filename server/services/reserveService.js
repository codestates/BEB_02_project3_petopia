const reserve = require("../models/reserve.js")
// const ObjectId = require("mongoose").Types.ObjectId;

const insertReserve = async(reserveInfo) => {
    const {reserveDate, reserveTime, userId, hospitalId} = reserveInfo;
    try {
        const newReserve = new reserve({reserve_date:reserveDate, reserve_time:reserveTime, user_id:userId, hospital_id:hospitalId});
        await newReserve.save();
        return newReserve;
    } catch (error) {
        throw Error(error);
    }
}

const getReserveList = async(id) => {
    try {
        return await reserve.find({hospital_id: id});
    } catch (error) {
        throw Error(error);
    }
}

module.exports = {
    insertReserve,
    getReserveList
}