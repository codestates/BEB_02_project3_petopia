const router = require('express').Router();
const NFTs = require('../../models/nft');


router.get('/', async (req, res, next) => {

    try {
        const nftList = await NFTs.find();
        const msg = "succeed";

        res.status(200).json({ nftList, msg });

    } catch (err) {
        const msg = "failed to get user NFT"
        res.status(400).json({ msg })
    }

})

module.exports = router;