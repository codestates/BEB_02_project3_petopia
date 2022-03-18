const router = require('express').Router();
// const { User } = require('../models');
const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:7545')

const myAddress = '0x152A9b3624F522efD3e94eBb97315614d666034C'; //


router.get('/', (req, res, next) => {


    web3.eth.getBalance(myAddress).then((bal) => {
        return web3.utils.fromWei(bal)
        //const balance = web3.utils.fromWei(bal);
    })
        .then((eth) => {
            // console.log(eth);
            // res.json(eth);
        })

    web3.eth.getBlockNumber(function (err, res) {
        let latest = res;
        for (let i = 1; i <= latest; i++) {
            web3.eth.getBlock(i, false, function (err, block) {
                // const transactions = block.transactions;
            })
        }
    })

    const Tx = '0x8088d79310468d58cef811319f5668089e141bcea25c0a3ba97543e71b37b894'

    const transaction = new Object();
    const Txhistory = new Array();

    web3.eth.getTransaction(Tx, function (err, desc) {
        // console.log(desc);
        console.log("ID : " + desc.blockNumber)
        console.log("Tx : " + desc.hash)
        console.log("From : " + desc.from)
        console.log("To : " + desc.to)
        console.log("Value(Eth) : " + web3.utils.fromWei(desc.value))

        transaction.id = desc.blockNumber;
        transaction.tx = desc.hash;
        transaction.from = desc.from;
        transaction.to = desc.to;
        transaction.value = web3.utils.fromWei(desc.value);

        Txhistory.push(transaction);

        console.log(Txhistory)
        res.json(Txhistory)

    })

});

module.exports = router;