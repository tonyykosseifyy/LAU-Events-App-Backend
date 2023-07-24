const Joi = require("joi");

const addClubSchema = Joi.object({
  clubName: Joi.string().min(1).required(),
});

module.exports = addClubSchema;
