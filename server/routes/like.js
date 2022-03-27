const router = require('express').Router();
const controller = require('../controllers/likeController.js');

router.get('/:id', controller.getLikes);
router.post('/', controller.insertLike);

module.exports = router;