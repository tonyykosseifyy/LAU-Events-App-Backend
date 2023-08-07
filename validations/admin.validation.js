const Joi = require('joi');

// Validation schema for POST /admins
const createAdminSchema = Joi.object({
    id: Joi.number().integer().required().messages({
        'number.base': 'Admin ID must be a number',
        'number.empty': 'Admin ID is required',
        'number.integer': 'Admin ID must be an integer'
    })
});

// Validation schema for GET /admins/{id} and DELETE /admins/{id}
const adminIdSchema = Joi.object({
    id: Joi.number().integer().required().messages({
        'number.base': 'Admin ID must be a number',
        'number.empty': 'Admin ID is required',
        'number.integer': 'Admin ID must be an integer'
    })
});

module.exports = {
    createAdminSchema,
    adminIdSchema
};
