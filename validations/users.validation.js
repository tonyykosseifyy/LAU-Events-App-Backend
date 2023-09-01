const Joi = require("joi");

const lauEmailRegex = /^[\w-]+(\.[\w-]+)*@lau\.edu(\.lb)?$/;
const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

// Validation schema for POST /
const createSchema = Joi.object({
  password: Joi.string().pattern(passwordRegex).required().messages({
    "string.base": "Password must be a string.",
    "string.pattern.base":
      "Password must have at least one digit, one uppercase, one lowercase, one special character, and a minimum of 8 total characters.",
    "any.required": "Password is required.",
  }),
  email: Joi.string().pattern(lauEmailRegex).required().messages({
    "string.base": "Email must be a string.",
    "string.pattern.base":
      "Email must be in the format firstname.lastname@lau.edu or @lau.edu.lb.",
    "any.required": "Email is required.",
  }),
  userType: Joi.string().valid("User", "Admin").required().messages({
    "string.base": "User type must be a string.",
    "any.only": "User type must be either User or Admin.",
    "any.required": "User type is required.",
  }),
  isVerified: Joi.boolean().required().messages({
    "boolean.base": "Is Verified must be a boolean.",
    "any.required": "Is Verified is required.",
  }),
  verificationToken: Joi.string().messages({
    "string.base": "Verification token must be a string.",
  }),
  major: Joi.string().required().messages({
    "string.base": "Major must be a string.",
    "any.required": "Major is required.",
  }),
  notificationToken: Joi.string().allow(null, "").messages({
    "string.empty": "Notification token must be a string",
  }),
});

// Validation schema for PUT /:id
const updateSchema = {
  params: Joi.object({
    id: Joi.number().integer().required().messages({
      "number.base": "User ID must be a number.",
      "number.integer": "User ID must be an integer.",
      "any.required": "User ID is required.",
    }),
  }),
  body: Joi.object({
    password: Joi.string().pattern(passwordRegex).messages({
      "string.base": "Password must be a string.",
      "string.pattern.base":
        "Password must have at least one digit, one uppercase, one lowercase, one special character, and a minimum of 8 total characters.",
    }),
    email: Joi.string().pattern(lauEmailRegex).messages({
      "string.base": "Email must be a string.",
      "string.pattern.base":
        "Email must be in the format firstname.lastname@lau.edu or @lau.edu.lb.",
    }),
    userType: Joi.string().valid("User", "Admin").messages({
      "string.base": "User type must be a string.",
      "any.only": "User type must be either User or Admin.",
    }),
    isVerified: Joi.boolean().messages({
      "boolean.base": "Is Verified must be a boolean.",
    }),
    verificationToken: Joi.string().messages({
      "string.base": "Verification token must be a string.",
    }),
    major: Joi.string().messages({
      "string.base": "Major must be a string.",
    }),
  }),
};

// Validation schema for DELETE /:id and GET /:id
const getOneSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    "number.base": "User ID must be a number.",
    "number.integer": "User ID must be an integer.",
    "any.required": "User ID is required.",
  }),
});

module.exports = {
  createSchema,
  updateSchema,
  getOneSchema,
};
