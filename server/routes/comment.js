const router = require('express').Router();
const controller = require('../controllers/commentController.js');

router.get('/', controller.readAllComment);
router.post('/', controller.insertComment);

module.exports = router;