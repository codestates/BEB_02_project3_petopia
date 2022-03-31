const router = require('express').Router();
const controller = require('../controllers/followController.js');

router.post('/', controller.insertFollow);
router.post('/unfollow', controller.deleteFollow)
router.get('/:id', controller.getFollowing);
router.get('/follower/:id', controller.getFollower);
router.post('/delete', controller.bothDeleteFollow);

module.exports = router;