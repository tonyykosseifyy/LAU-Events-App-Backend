const Joi = require("joi");

const isLAUEmail = (value, helpers) => {
  if (value.endsWith("@lau.edu") || value.endsWith("@lau.edu.lb")) {
    return value;
  }
  return helpers.error("any.invalid");
};

const loginSchema = Joi.object({
  email: Joi.string()
    .required()
    .email()
    .custom(isLAUEmail, "Not a valid LAU email"),
  password: Joi.string()
    .required()
    .min(8)
    .max(50)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&_])[A-Za-z\\d@$!%*?&]+$"
      )
    )
    .message(
      '"{#label}" must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.'
    ),
});

module.exports = loginSchema;
