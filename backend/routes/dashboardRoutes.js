const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/dashboardController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', authorizeRoles('Admin', 'Base Commander', 'Logistics Officer'), getDashboardData);

module.exports = router;
