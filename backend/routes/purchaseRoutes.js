const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { createPurchase, getPurchases } = require('../controllers/purchaseController');

const router = express.Router();

router.post('/', authenticate, authorize('admin', 'logistics'), createPurchase);
router.get('/', authenticate, getPurchases);

module.exports = router;
