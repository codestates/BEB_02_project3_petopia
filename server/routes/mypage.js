const router = require('express').Router();
const Users = require('../models/user');

router.get('/', async (req, res, next) => {

    console.log(req.body)

    // 사용자 이름 조회
    Users.find()
        .then((user) => {
            console.log(user)
            res.json(user);
        });

    // Post.find()
    //     .then((post) => {
    //         res.json(post);
    //     });

})

module.exports = router;