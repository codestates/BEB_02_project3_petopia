const router = require('express').Router();
const create = require('./create.js');
const user = require('./user.js');
const contract = require('./contract.js');
const hospital = require('./hospital.js');
const follow = require('./follow.js');
const like = require('./like.js');
const comment = require('./comment.js');
const reserve = require('./reserve.js');

router.use('/user', user);
router.use('/create', create);
router.use('/contract', contract);
router.use('/hospital', hospital);
router.use('/follow', follow);
router.use('/reserve', reserve);
router.use('/like', like);
router.use('/commnet', comment);


module.exports = router;