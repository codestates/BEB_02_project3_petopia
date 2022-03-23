const router = require('express').Router();
const create = require('./create.js')
const like = require('./like.js');
const comment = require('./comment.js');

router.use('/create', create);
router.use('/like', like);
router.use('/comment', comment);


module.exports = router;