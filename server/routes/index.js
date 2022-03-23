const router = require('express').Router();
// const create = require('./create.js');
// router.use('/create', create);


router.use('/', require('./main'))
router.use('/login', require('./login'));
router.use('/mypage', require('./mypage'));
router.use('/connect', require('./navbar'));
router.use('/transaction', require('./transaction'));
router.use('/user', require('./user'));

//erc721
router.use('/createNFT', require('./erc721/createNFT'));
router.use('/getNFT', require('./erc721/getNFT'));

//erc20
// router.use('/deployTOKEN', require('./erc20/deployTOKEN'));
// router.use('/transferTOKEN', require('./erc20/'))

module.exports = router;