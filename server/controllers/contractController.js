const cotractService = require('../services/contractService.js');

const transaction = async (req, res) => {
    const txResult = await cotractService.transaction(req.body.address);

    if(txResult){
        return res.status(200).json({ data: txResult, message: "success!" });
    } else {
        return res.status(204).json({ data: txResult, message: "fail!" });
    }
}

const getTxHistory = async (req, res) => {
    const txHistoryList = await cotractService.getTxHistory(req.params.id);

    if(txHistoryList) {
        return res.status(200).json({ data: txHistoryList, message: "success!" });
    } else {
        return res.status(204).json({ data: txHistoryList, message: "fail!" });
    }
}

module.exports = {
    transaction,
    getTxHistory
}