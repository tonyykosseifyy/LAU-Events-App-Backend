const Joi = require('joi');

const loginSchema = Joi.object({
    username: Joi.string()
        .pattern(new RegExp('^[a-z]+\\.[a-z]+$'))
        .required(),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])'))
        .required(),
});

module.exports = loginSchema;
