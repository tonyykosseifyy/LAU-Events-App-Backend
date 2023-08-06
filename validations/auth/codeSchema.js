const Joi = require('joi');


const codeSchema = Joi.object({
  userId: Joi.number().required(),
  code: Joi.string().required().min(6).max(6)
});


module.exports = codeSchema; 