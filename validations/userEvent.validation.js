const Joi = require('joi');

// Validation schema for POST /userEvents
const createSchema = Joi.object({
  userId: Joi.number().integer().required().messages({
    'number.base': 'User ID must be a number.',
    'number.integer': 'User ID must be an integer.',
    'any.required': 'User ID is required.'
  }),
  eventId: Joi.number().integer().required().messages({
    'number.base': 'Event ID must be a number.',
    'number.integer': 'Event ID must be an integer.',
    'any.required': 'Event ID is required.'
  }),
  status: Joi.string().valid('Accepted', 'Declined', 'Ignored').required().messages({
    'string.base': 'Status must be a string.',
    'any.only': 'Status must be either Accepted, Declined, or Ignored.',
    'any.required': 'Status is required.'
  }),
});

// Validation schema for PUT /userEvents/:id
const updateSchema = {
  params: Joi.object({
    id: Joi.number().integer().required().messages({
      'number.base': 'User Event ID must be a number.',
      'number.integer': 'User Event ID must be an integer.',
      'any.required': 'User Event ID is required.'
    }),
  }),
  body: Joi.object({
    status: Joi.string().valid('Accepted', 'Declined', 'Ignored').messages({
      'string.base': 'Status must be a string.',
      'any.only': 'Status must be either Accepted, Declined, or Ignored.',
    }),
  }),
};

// Validation schema for DELETE /userEvents/:id and GET /userEvents/:id
const getOneSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'User Event ID must be a number.',
    'number.integer': 'User Event ID must be an integer.',
    'any.required': 'User Event ID is required.'
  }),
});

module.exports = {
  createSchema,
  updateSchema,
  getOneSchema
};
