const router = require('express').Router();
const create = require('./create.js')

router.use('/create', create);

router.get('/', (req, res, next) => {
    res.send('ok')
})
router.use('/transaction', require('./transaction'))
router.use('/mypage', require('./mypage'));
router.use('/login', require('./login'));

module.exports = router;