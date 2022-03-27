const router = require('express').Router();
const controller = require('../controllers/postController.js');

router.post('/', controller.insertPost);
router.get('/:id/:type', controller.getPostInfo);

module.exports = router;