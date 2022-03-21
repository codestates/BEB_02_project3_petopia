require('dotenv').config();
// const router = require('express').Router();
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545/'));

// TOKEN deploy
// router.use('/', async (req, res, next) => {
const erc20abi = require('../../contract/erc20abi');
const erc20bytecode = require('../../contract/erc20bytecode');
const me = '0x00Eea75b7e0132d8162850b669BEE234756225B4';

const erc20Contract = new web3.eth.Contract(erc20abi);

let payload = {
    data: erc20bytecode,
    arguments: [1000000000000] // 이거 숫자 높혀야되는데 왜 BigNumber 라는 에러 뜨는지 모르겠음...
};

erc20Contract.deploy(payload)
    .send({
        from: me,
        gas: 2000000,
        // gasPrice: '20000000000'
    }).on('error', function (error) {
        console.log(error);
    }).on('transactionHash', function (transactionHash) {
        console.log('transaction : ', transactionHash)
    }).on('receipt', function (receipt) {
        console.log('contract :', receipt.contractAddress)
    })
// })

// module.exports = router;