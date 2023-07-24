const Joi = require('joi');

const SignupSchema = Joi.object({
    username: Joi.string().min(4).required(),
    password: Joi.string().min(8).pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])')).required(),
    email: Joi.string().min(5).required()
});

module.exports = SignupSchema;
