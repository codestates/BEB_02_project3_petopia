const router = require('express').Router();
const Users = require('../models/user');

router.post('/', async (req, res, next) => {

    console.log(req.body)

    const me = new Users({
        username: req.body.username
    });

    me.save().then(() => {
        console.log(me);
    }).catch((err) => {
        console.log("Error : " + err);
    })

})

module.exports = router;