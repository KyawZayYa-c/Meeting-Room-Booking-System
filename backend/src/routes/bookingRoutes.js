const express = require('express');
const router = express.Router();
const { protect } = require('../utils/middleware/authMiddleware');
const { validate } = require('../utils/middleware/validator');
const { createBookingSchema } = require('../utils/validations/bookingValidation');
const bookingController = require('../controllers/bookingController');

router.post('/', protect, validate(createBookingSchema), bookingController.create);
router.get('/', protect, bookingController.getAll);
router.get('/:id', protect, bookingController.getById);
router.delete('/:id', protect, bookingController.deleteById);
router.get('/user/:userId', protect, bookingController.getByUser);

module.exports = router;