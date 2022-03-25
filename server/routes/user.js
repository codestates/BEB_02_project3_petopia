const router = require('express').Router();
const controller = require('../controllers/userController.js');

router.post('/login', controller.login);
router.post('/signup', controller.signup);
router.post('/getUserInfo', controller.getUserInfo);
router.post('/update', controller.updateUser);

module.exports = router;