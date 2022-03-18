const router = require('express').Router();
const create = require('./create.js')

router.use('/create', create);

router.get('/', (req, res, next) => {
    res.send('ok')
})
router.use('/login', require('./login'));
router.use('/mypage', require('./mypage'));

module.exports = router;