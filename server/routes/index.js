const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.send('ok')
})
router.use('/transaction', require('./transaction'))
router.use('/mypage', require('./mypage'));
router.use('/login', require('./login'));

module.exports = router;