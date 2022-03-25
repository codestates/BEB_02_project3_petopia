const router = require('express').Router();
const controller = require('../controllers/likeController.js');

router.post('/', controller.insertLike);

module.exports = router;