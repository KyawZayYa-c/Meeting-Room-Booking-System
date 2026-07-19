const express = require('express');
const router = express.Router();
const { protect } = require('../utils/middleware/authMiddleware');
const { validate } = require('../utils/middleware/validator');
const {  loginSchema } = require('../utils/validations/authValidation');
const authController = require('../controllers/authController');

router.post('/login', validate(loginSchema), authController.login);
router.post('/logout', protect, authController.logout);
router.get('/me', protect, authController.getMe);

module.exports = router;