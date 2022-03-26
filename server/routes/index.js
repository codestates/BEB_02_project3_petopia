const router = require('express').Router();
const create = require('./create.js');
const user = require('./user.js');
const contract = require('./contract.js');
const hospital = require('./hospital.js');

router.use('/user', user);
router.use('/create', create);
router.use('/contract', contract);
router.use('/hospital', hospital);

module.exports = router;