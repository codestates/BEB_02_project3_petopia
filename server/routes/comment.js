const router = require('express').Router();
const controller = require('../controllers/commentController.js');

router.get('/:id', controller.readAllComment);
router.post('/', controller.insertComment);
router.post('/:id', controller.deleteComment);

module.exports = router;