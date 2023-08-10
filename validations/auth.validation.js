const Joi = require('joi');

// Validation schema for POST /signin
const signinSchema = Joi.object({
    email: Joi.string().required().messages({
        'string.empty': 'Email is required',
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Password is required',
    })
});

// Validation schema for POST /refreshToken
const refreshTokenSchema = Joi.object({
    refreshToken: Joi.string().required().messages({
        'string.empty': 'Refresh token is required'
    })
});

// Validation schema for POST /verify
const verifySchema = Joi.object({
    userId: Joi.number().integer().required().messages({
        'number.base': 'User ID must be a number',
        'number.empty': 'User ID is required',
        'number.integer': 'User ID must be an integer'
    }),
    code: Joi.string().required().messages({
        'string.empty': 'Code is required'
    })
});

const signupSchema = Joi.object({
    email: Joi.string().email().required().pattern(/@(lau\.edu|lau\.edu\.lb)$/).messages({
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid email address',
        'string.pattern.base': 'Email should end with @lau.edu or @lau.edu.lb'
    }),
    password: Joi.string().required().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).messages({
        'string.empty': 'Password is required',
        'string.min': 'Password should have at least 8 characters',
        'string.pattern.base': 'Password should have at least one digit, one uppercase letter, one lowercase letter, and one special character'
    }),
    major: Joi.string().required().example('Computer Science').messages({
        'string.empty': 'Major is required'
    })
});

module.exports = {
    signinSchema,
    refreshTokenSchema,
    verifySchema,
    signupSchema
};
