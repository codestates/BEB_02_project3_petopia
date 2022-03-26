const router = require('express').Router();
const controller = require('../controllers/followController.js');

router.post('/', controller.insertFollow);
router.post('/unfollow', controller.deleteFollow)
router.get('/:id', controller.getFollower);

module.exports = router;