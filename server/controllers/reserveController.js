const reserveService = require('../services/reserveService.js');

const insertReserve = async(req, res) => {
    const reserveInfo = req.body;
    const reserveList = await reserveService.insertReserve(reserveInfo);
    
    if(reserveList !== null) {
        return res.status(200).json({ data: reserveList, message: "posting success!" });
    } else {
        return res.status(204).json({ data: null, message: "posting fail!" });
    }
}

const getReserveList = async(req, res) => {
    const reserveInfo = req.body;
    const reserveList = await reserveService.getReserveList(reserveInfo);

    if(reserveList !== null) {
        return res.status(200).json({ data: reserveList, message: "success!" });
    } else {
        return res.status(204).json({ data: null, message: "fail!" });
    }
}

module.exports = {
    insertReserve,
    getReserveList
}