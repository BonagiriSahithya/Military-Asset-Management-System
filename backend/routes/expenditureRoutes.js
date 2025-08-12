const express = require('express');
const router = express.Router();
const { createExpenditure, getExpenditures } = require('../controllers/expenditureController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Public GET - anyone can fetch expenditures
router.get('/', getExpenditures);

// Protected POST - only Admin and Base Commander can create
router.post('/', protect, authorizeRoles('Admin', 'Base Commander'), createExpenditure);

module.exports = router;
