const Joi = require('joi');

const getOneSchema = Joi.object({
    id: Joi.number().integer().required().messages({
      'number.base': 'ClubEvent ID must be a number.',
      'number.integer': 'ClubEvent ID must be an integer.',
      'any.required': 'ClubEvent ID is required.'
    }),
});

const createSchema = Joi.object({
    clubId: Joi.number().integer().required().messages({
      'number.base': 'Club ID must be a number.',
      'number.integer': 'Club ID must be an integer.',
      'any.required': 'Club ID is required.'
    }),
    eventId: Joi.number().integer().required().messages({
      'number.base': 'Event ID must be a number.',
      'number.integer': 'Event ID must be an integer.',
      'any.required': 'Event ID is required.'
    }),
});

const updateSchema = {
  params: Joi.object({
    id: Joi.number().integer().required().messages({
      'number.base': 'ClubEvent ID must be a number.',
      'number.integer': 'ClubEvent ID must be an integer.',
      'any.required': 'ClubEvent ID is required.'
    }),
  }),
  body: Joi.object({
    clubId: Joi.number().integer().required().messages({
      'number.base': 'Club ID must be a number.',
      'number.integer': 'Club ID must be an integer.',
      'any.required': 'Club ID is required.'
    }),
    eventId: Joi.number().integer().required().messages({
      'number.base': 'Event ID must be a number.',
      'number.integer': 'Event ID must be an integer.',
      'any.required': 'Event ID is required.'
    }),
  }),
};

const deleteOneSchema = Joi.object({
    id: Joi.number().integer().required().messages({
        'number.base': 'ClubEvent ID must be a number.',
        'number.integer': 'ClubEvent ID must be an integer.',
        'any.required': 'ClubEvent ID is required.'
    }),
});

module.exports = {
  getOneSchema,
  createSchema,
  updateSchema,
  deleteOneSchema,
};
