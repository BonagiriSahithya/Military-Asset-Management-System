const express = require('express');
const router = express.Router();
const { createAssignment, getAssignments } = require('../controllers/assignmentController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.use(protect);

// Admin and Base Commanders can create assignments
router.post('/', authorizeRoles('Admin', 'Base Commander'), createAssignment);

// Admin and Base Commanders can view assignments
router.get('/', authorizeRoles('Admin', 'Base Commander'), getAssignments);

module.exports = router;
