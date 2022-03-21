require('dotenv').config();
const router = require('express').Router();
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545/'));
const NFTs = require('../../models/nft');

router.post('/', async (req, res, next) => {

    const metadata = req.body
    const imageurl = req.body.image

    const erc721abi = require('../../contract/erc721abi');
    const erc721CA = '0x870AdaCE8821484baaf2190A4153dC39212551Fe'

    // const me = req.body.address;
    const me = '0x00Eea75b7e0132d8162850b669BEE234756225B4'
    const erc721Contract = await new web3.eth.Contract(erc721abi, erc721CA, {
        from: me
    });

    const totalSupply = await erc721Contract.methods.totalSupply().call();
    const name = await erc721Contract.methods.name().call();

    const mintnft = await erc721Contract.methods.mintNFT(me, imageurl).send({
        from: me,
        gas: 2000000
    }).
        on('error', function (error) {
            console.log(error)
        })

    const nft = new NFTs(metadata);

    nft.save().then(() => {
        console.log(nft);
    }).catch((err) => {
        console.log("Error : " + err);
    })

    // console.log(mintnft)
    res.status(201).json({ mintnft });

})

module.exports = router;