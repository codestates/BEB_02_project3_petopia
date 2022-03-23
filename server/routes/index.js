const router = require('express').Router();
const create = require('./create.js')
const user = require('./user.js')

router.use('/user', user);
router.use('/create', create);

module.exports = router;