const express = require('express');
const router = express.Router();
const { createTransfer, getTransfers } = require('../controllers/transferController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.use(protect);

// Only Admin and Logistics Officers can create transfers
router.post('/', authorizeRoles('Admin', 'Logistics Officer'), createTransfer);

// Admin, Base Commander (for their base), Logistics Officer can view transfers
router.get('/', authorizeRoles('Admin', 'Base Commander', 'Logistics Officer'), getTransfers);

module.exports = router;
