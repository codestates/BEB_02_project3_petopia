const router = require('express').Router();
const controller = require('../controllers/contractController.js');

router.post('/like', controller.transaction);
router.get('/:id', controller.getTxHistory);

module.exports = router;