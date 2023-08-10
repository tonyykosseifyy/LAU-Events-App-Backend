const Joi = require("joi");

// Validation schema for POST /
const createSchema = Joi.object({
  eventName: Joi.string().required().messages({
    "string.base": "Event name must be a string.",
    "any.required": "Event name is required.",
  }),
  eventDescription: Joi.string().required().messages({
    "string.base": "Event description must be a string.",
    "any.required": "Event description is required.",
  }),
  startTime: Joi.date().iso().required().messages({
    "date.format": "Start time must be a date-time string.",
    "any.required": "Start time is required.",
  }),
  endTime: Joi.date().iso().required().messages({
    "date.format": "End time must be a date-time string.",
    "any.required": "End time is required.",
  }),
  status: Joi.string().valid("Active", "Cancelled").messages({
    "string.base": "Status must be a string.",
    "any.only": "Status must be either active or Cancelled.",
  }),
  clubIds: Joi.array().items(Joi.number().integer()).messages({
    "number.base": "Club IDs must be numbers.",
    "number.integer": "Club IDs must be integers.",
  }),
});

// Validation schema for PUT /:id
const updateSchema = {
  params: Joi.object({
    id: Joi.number().integer().required().messages({
      "number.base": "Event ID must be a number.",
      "number.integer": "Event ID must be an integer.",
      "any.required": "Event ID is required.",
    }),
  }),
  body: Joi.object({
    eventName: Joi.string().messages({
      "string.base": "Event name must be a string.",
    }),
    eventDescription: Joi.string().messages({
      "string.base": "Event description must be a string.",
    }),
    startTime: Joi.date().iso().messages({
      "date.format": "Start time must be a date-time string.",
    }),
    endTime: Joi.date().iso().messages({
      "date.format": "End time must be a date-time string.",
    }),
    status: Joi.string().messages({
      "string.base": "Status must be a string.",
    }),
  }),
};

// Validation schema for DELETE /:id and GET /:id
const getOneSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    "number.base": "Event ID must be a number.",
    "number.integer": "Event ID must be an integer.",
    "any.required": "Event ID is required.",
  }),
});

module.exports = {
  createSchema,
  updateSchema,
  getOneSchema,
};
