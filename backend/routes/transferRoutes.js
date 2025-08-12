const express = require('express');
const router = express.Router();
const { createTransfer, getTransfers } = require('../controllers/transferController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Public GET route — no auth required
router.get('/', getTransfers);

// Protected POST route — only Admin and Logistics Officer can create
router.post('/', protect, authorizeRoles('Admin', 'Logistics Officer'), createTransfer);

module.exports = router;
