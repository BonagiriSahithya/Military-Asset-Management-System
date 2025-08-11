const express = require('express');
const router = express.Router();
const { createExpenditure, getExpenditures } = require('../controllers/expenditureController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.use(protect);

// Admin and Base Commanders can create expenditures
router.post('/', authorizeRoles('Admin', 'Base Commander'), createExpenditure);

// Admin and Base Commanders can view expenditures
router.get('/', authorizeRoles('Admin', 'Base Commander'), getExpenditures);

module.exports = router;
