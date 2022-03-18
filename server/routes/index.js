const router = require('express').Router();
const create = require('./create.js')

router.use('/create', create);

module.exports = router;