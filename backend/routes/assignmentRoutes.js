const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { createAssignment, getAssignments } = require('../controllers/assignmentController');
const router = express.Router();

router.post('/', authenticate, authorize('admin', 'logistics'), createAssignment);
router.get('/', authenticate, getAssignments);

module.exports = router;
