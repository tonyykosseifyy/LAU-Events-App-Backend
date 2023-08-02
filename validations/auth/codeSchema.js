const Joi = require('joi');


const codeSchema = Joi.object({
  userId: Joi.string().required(),
  code: Joi.string().required().min(6).max(6)
});


module.exports = codeSchema; 