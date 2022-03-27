const router = require('express').Router();
const controller = require('../controllers/userController.js');

router.post('/login', controller.login);
router.post('/signup', controller.signup);
router.get('/:id', controller.getUserInfo);
router.post('/update', controller.updateUser);
router.get('/search/:name', controller.getUserList);

module.exports = router;