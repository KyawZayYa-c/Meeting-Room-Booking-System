const express = require('express');
const router = express.Router();
const { protect, admin, ownerOrAdmin} = require('../utils/middleware/authMiddleware');
const { validate } = require('../utils/middleware/validator');
const { createUserSchema, updateRoleSchema, changePasswordSchema } = require('../utils/validations/authValidation');
const userController = require('../controllers/userController');

router.get('/', protect, ownerOrAdmin, userController.getAll);
router.get('/:id', protect, admin, userController.getById);
router.post('/', protect, admin, validate(createUserSchema), userController.create);
router.put('/:id/role', protect, admin, validate(updateRoleSchema), userController.changeRole);
router.put('/:id/password', protect, validate(changePasswordSchema), userController.changePassword);
router.delete('/:id', protect, admin, userController.deleteById);

module.exports = router;