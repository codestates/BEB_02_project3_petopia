const router = require('express').Router();
const NFTs = require('../models/nft');
const Users = require('../models/user')

router.get('/', async (req, res, next) => {

    // console.log(req.body)

    // // 사용자 이름 조회
    // Users.find()
    //     .then((user) => {
    //         console.log(user)
    //         res.json(user);
    //     });

    // Post.find()
    //     .then((post) => {
    //         res.json(post);
    //     });

})

// NFT 불러오기
router.get('/getNFTList', async (req, res, next) => {
    NFTs.find({
        'username': 'user1'
    })
        .then((nft) => {
            res.status(200).json(nft);
        })
})

module.exports = router;