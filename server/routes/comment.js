const router = require('express').Router();
const controller = require('../controllers/commentController.js');

router.post('/', controller.insertComment);

module.exports = router;