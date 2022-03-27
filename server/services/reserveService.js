const Reserve = require("../models/reserve.js")
const Hospital = require("../models/hospital.js")

const insertReserve = async(reserveInfo) => {
    const {reserveDate, reserveTime, userId, hospitalId, reserveName, petName, reservePhone} = reserveInfo;
    const hospital = await Hospital.findById(hospitalId);
    console.log(hospital);
    try {
        const newReserve = new Reserve({
            reserve_date:reserveDate,
            reserve_time:reserveTime,
            user_id:userId,
            reserve_name:reserveName,
            pet_name:petName,
            reserve_phone: reservePhone,
            hospital:hospital._id
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
        return await Reserve.find({reserve_date:reserveDate, hospital_id: hospitalId});
    } catch (error) {
        throw Error(error);
    }
}

const getMyReserveList = async(id) => {
    try {
        return await Reserve.find({user_id:id}).populate('hospital').exec();
    } catch (error) {
        throw Error(error);
    }
}

const deleteReservation = async(id) => {
    try {
        let result = false;
        await Reserve.findByIdAndDelete(id).then((res) => {
            if(res.deletedCount > 0) result = true;
        });
        return result;
    } catch (error) {
        throw Error(error);
    }
}

module.exports = {
    insertReserve,
    getReserveList,
    getMyReserveList,
    deleteReservation
}