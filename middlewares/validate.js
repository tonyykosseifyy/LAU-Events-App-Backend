const Joi = require('joi');

const validate = (schema, property) => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property]);
        if (error) {
            const errorMessage = error.details[0].message;
            return res.status(400).json({ error: errorMessage });
        }
        next();
    };
};

module.exports = validate;
