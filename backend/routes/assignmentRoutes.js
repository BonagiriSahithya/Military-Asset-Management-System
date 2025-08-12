const express = require('express');
const router = express.Router();
const { createAssignment, getAssignments } = require('../controllers/assignmentController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Public GET route — anyone can view assignments
router.get('/', getAssignments);

// Protected POST route — only Admin and Base Commanders can create
router.post('/', protect, authorizeRoles('Admin', 'Base Commander'), createAssignment);

module.exports = router;
