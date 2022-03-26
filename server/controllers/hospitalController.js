const hospitalService = require('../services/hospitalService.js');

const getHospitalList = async(req, res) => {
    const hospitalList = await hospitalService.getHospitalList();
    if(hospitalList !== null) {
        return res.status(200).json({ data: hospitalList, message: "success!" });
    } else {
        return res.status(204).json({ data: null, message: "fail!" });
    }
}

const getHospital = async(req, res) => {
    const id = req.params.id;
    const hospital = await hospitalService.getHospital(id);

    if(hospital !== null) {
        return res.status(200).json({ data: hospital, message: "success!" });
    } else {
        return res.status(204).json({ data: null, message: "fail!" });
    }
}

module.exports = {
    getHospitalList,
    getHospital
}