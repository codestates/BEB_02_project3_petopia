const router = require('express').Router();
const Users = require('../models/user');
const NFTs = require('../models/nft');

router.post('/', async (req, res, next) => {

    const text = req.body.username

    try {
        const UserList = await Users.find()
            .where('username').equals(text);

        const NftList = await NFTs.find()
            .where('username').equals(text);

        res.status(200).json({ UserList, NftList });
        console.log(text);
        console.log(UserList, NftList);
    } catch (err) {
        const msg = "Not found UserInfo"
        res.status(400).json({ msg });
    }
})

router.get('/:username', async (req, res, next) => {

    try {
        const UserList = await Users.find()
            .where('username').equals(req.params.username)

        const NftList = await NFTs.find()
            .where('username').equals(req.params.username)

        res.status(200).json({ UserList, NftList });
    } catch (err) {
        res.status(400).json('failed' + err);
    }
})


module.exports = router;