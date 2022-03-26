const router = require('express').Router();
const controller = require('../controllers/likeController.js');

router.get('/', controller.readAll);
router.post('/', controller.insertLike);

module.exports = router;