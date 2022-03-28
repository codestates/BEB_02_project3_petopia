const router = require('express').Router();
const controller = require('../controllers/replyController.js');

router.get('/:id', controller.getReplies);
router.post('/', controller.insertReply);
router.post('/:id', controller.deleteReply);

module.exports = router;