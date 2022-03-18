const router = require('express').Router();
const controller = require('../controllers/createController.js');

router.post('/', controller.insertPost);

module.exports = router;