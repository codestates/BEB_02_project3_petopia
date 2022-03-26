const hospital = require("../models/hospital.js")
const ObjectId = require("mongoose").Types.ObjectId;

const getHospitalList = async() => {
    try {
        return await hospital.find({});
    } catch (error) {
        throw Error(error);
    }
}

const getHospital = async(id) => {
    try {
        return await hospital.findOne({_id: new ObjectId(id)});
    } catch (error) {
        throw Error(error);
    }
}

module.exports = {
    getHospitalList,
    getHospital
}