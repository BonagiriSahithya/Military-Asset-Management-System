const express = require('express');
const router = express.Router();
const { createPurchase, getPurchases } = require('../controllers/purchaseController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Public GET route - no auth required
router.get('/', getPurchases);

// Protected POST route - only Admin and Logistics Officer can create
router.post('/', protect, authorizeRoles('Admin', 'Logistics Officer'), createPurchase);

module.exports = router;
