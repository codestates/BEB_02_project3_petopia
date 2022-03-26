const router = require('express').Router();
const controller = require('../controllers/hospitalController.js');

router.get('/', controller.getHospitalList);
router.get('/:id', controller.getHospital);

module.exports = router;