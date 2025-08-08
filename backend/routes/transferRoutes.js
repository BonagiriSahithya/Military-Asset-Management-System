const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { createTransfer, getTransfers } = require('../controllers/transferController');
const router = express.Router();

router.post('/', authenticate, authorize('admin','logistics'), createTransfer);
router.get('/', authenticate, getTransfers);

module.exports = router;
