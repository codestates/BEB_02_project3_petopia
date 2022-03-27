const reserve = require("../models/reserve.js")
// const ObjectId = require("mongoose").Types.ObjectId;

const insertReserve = async(reserveInfo) => {
    const {reserveDate, reserveTime, userId, hospitalId, reserveName, petName, reservePhone} = reserveInfo;
    try {
        const newReserve = new reserve({
            reserve_date:reserveDate,
            reserve_time:reserveTime,
            user_id:userId,
            hospital_id:hospitalId,
            reserve_name:reserveName,
            pet_name:petName,
            reserve_phone: reservePhone
        });
        await newReserve.save();
        return newReserve;
    } catch (error) {
        throw Error(error);
    }
}

const getReserveList = async(reserveInfo) => {
    const {reserveDate, hospitalId} = reserveInfo;
    try {
        return await reserve.find({reserve_date:reserveDate, hospital_id: hospitalId});
    } catch (error) {
        throw Error(error);
    }
}

const getMyReserveList = async(id) => {
    try {
        return await reserve.find({user_id:id});
    } catch (error) {
        throw Error(error);
    }
}

module.exports = {
    insertReserve,
    getReserveList,
    getMyReserveList
}