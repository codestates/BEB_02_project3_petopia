const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.send('ok')
})
router.use('/login', require('./login'));
router.use('/mypage', require('./mypage'));

module.exports = router;