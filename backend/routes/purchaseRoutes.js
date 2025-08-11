const express = require('express');
const router = express.Router();
const { createPurchase, getPurchases } = require('../controllers/purchaseController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.use(protect);

// Only Admin and Logistics Officers can create purchases
router.post('/', authorizeRoles('Admin', 'Logistics Officer'), createPurchase);

// Admin, Base Commander (for their base), Logistics Officer can view purchases
router.get('/', authorizeRoles('Admin', 'Base Commander', 'Logistics Officer'), getPurchases);

module.exports = router;
