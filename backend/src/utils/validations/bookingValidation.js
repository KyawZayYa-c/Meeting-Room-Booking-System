const Joi = require('joi');

const createBookingSchema = Joi.object({
    date: Joi.date().required().messages({
        'date.base': 'Date must be a valid date',
        'any.required': 'Date is required',
    }),
    startTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required().messages({
        'string.pattern.base': 'Start time must be in HH:MM format',
        'any.required': 'Start time is required',
    }),
    endTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required().messages({
        'string.pattern.base': 'End time must be in HH:MM format',
        'any.required': 'End time is required',
    }),
});

module.exports = {
    createBookingSchema,
};