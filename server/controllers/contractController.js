const cotractService = require('../services/contractService.js');

const transaction = async (req, res) => {
    const txResult = await cotractService.transaction(req.body.address);

    if(txResult){
        return res.status(200).json({ data: txResult, message: "success!" });
    } else {
        return res.status(204).json({ data: txResult, message: "fail!" });
    }
}

module.exports = {
    transaction
}