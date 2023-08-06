const Joi = require('joi');

// status is enum between 3 values: ENUM('Ignored', 'Accepted', 'Declined')

const postUserEvent = Joi.object({
  eventId: Joi.number().required(),
  status: Joi.string().valid('Ignored', 'Accepted', 'Declined').required(),
});


module.exports = postUserEvent; 