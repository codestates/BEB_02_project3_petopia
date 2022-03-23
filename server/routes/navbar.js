const router = require('express').Router();
const Users = require('../models/user');

router.post('/', async (req, res, next) => {

    const me = new Users({
        'address': req.body.address,
        'username': req.body.username
    });

    // me.updateOne({ 'username': req.body.username }, { $set: { 'address': req.body.address } }).then(()=> {
    me.save().then(() => {
        console.log(me);
    }).catch((err) => {
        console.log("Error : " + err);
    })
})


module.exports = router;