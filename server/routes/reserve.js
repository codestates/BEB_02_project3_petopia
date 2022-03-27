const router = require('express').Router();
const controller = require('../controllers/reserveController.js');

router.post('/', controller.insertReserve);
router.post('/getReserveList', controller.getReserveList);
router.get('/:id', controller.getMyReserveList);
router.post('/:id', controller.deleteReservation);

module.exports = router;