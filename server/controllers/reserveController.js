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

const getMyReserveList = async(req, res) => {
    const reserveList = await reserveService.getMyReserveList(req.params.id);

    if(reserveList !== null) {
        return res.status(200).json({ data: reserveList, message: "success!" });
    } else {
        return res.status(204).json({ data: null, message: "fail!" });
    }
}

const deleteReservation = async(req, res) => {
    const result = await reserveService.deleteReservation(req.params.id);
    if(result) {
        return res.status(200).json({ data: result, message: "unfollow success!" });
    } else {
        return res.status(204).json({ data: null, message: "unfollow fail!" });
    }
}

module.exports = {
    insertReserve,
    getReserveList,
    getMyReserveList,
    deleteReservation
}