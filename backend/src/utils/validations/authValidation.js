const Joi = require('joi');

// Login validation schemas
const loginSchema = Joi.object({
    email: Joi.string().required().email().messages({
        'string.empty': 'Email is required',
        'string.email': 'Please enter a valid email address',
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Password is required',
    }),
});

// Update user role validation schemas
const updateRoleSchema = Joi.object({
    role: Joi.string().required().valid('admin', 'owner', 'user').messages({
        'string.empty': 'Role is required',
        'any.only': 'Role must be admin, owner, or user',
    }),
});

// Change password validation schemas
const changePasswordSchema = Joi.object({
    currentPassword: Joi.string().required().messages({
        'string.empty': 'Current password is required',
    }),
    newPassword: Joi.string().required().min(6).messages({
        'string.empty': 'New password is required',
        'string.min': 'New password must be at least 6 characters',
    }),
});

// Create user by admin validation schemas
const createUserSchema = Joi.object({
    name: Joi.string().required().min(2).max(50).messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name must be less than 50 characters',
    }),
    email: Joi.string().required().email().messages({
        'string.empty': 'Email is required',
        'string.email': 'Please enter a valid email address',
    }),
    password: Joi.string().required().min(6).messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters',
    }),
    role: Joi.string().valid('admin', 'owner', 'user').default('user').messages({
        'any.only': 'Role must be admin, owner, or user',
    }),
});

module.exports = {
    loginSchema,
    updateRoleSchema,
    changePasswordSchema,
    createUserSchema,
};