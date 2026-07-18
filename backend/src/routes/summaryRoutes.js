const express = require('express');
const router = express.Router();
const { protect } = require('../utils/middleware/authMiddleware');
const summaryController = require('../controllers/summaryController');

router.get('/grouped', protect, summaryController.getGrouped);
router.get('/usage', protect, summaryController.getUsage);

module.exports = router;