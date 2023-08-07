const Joi = require('joi');

// Validation schema for POST /admins
const createAdminSchema = Joi.object({
    id: Joi.number().integer().required()
});

// Validation schema for GET /admins/{id} and DELETE /admins/{id}
const adminIdSchema = Joi.object({
    id: Joi.number().integer().required()
});

module.exports = {
    createAdminSchema,
    adminIdSchema
};