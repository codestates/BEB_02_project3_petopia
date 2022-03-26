const router = require('express').Router();
const controller = require('../controllers/reserveController.js');

router.post('/', controller.insertReserve);
router.post('/getReserveList', controller.getReserveList);

module.exports = router;