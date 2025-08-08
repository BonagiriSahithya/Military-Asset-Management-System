const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { createExpenditure, getExpenditures } = require('../controllers/expenditureController');
const router = express.Router();

router.post('/', authenticate, authorize('admin', 'logistics'), createExpenditure);
router.get('/', authenticate, getExpenditures);

module.exports = router;
