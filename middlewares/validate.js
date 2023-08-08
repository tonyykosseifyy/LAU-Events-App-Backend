const validate = (validations) => {
    return async (req, res, next) => {
      try {
        for (let validation of validations) {
          const { error } = validation.schema.validate(req[validation.property]);
          if (error) {
            const errorMessage = error.details[0].message;
            return res.status(400).json({ error: errorMessage });
          }
        }
        next();
      } catch (error) {
        next(error);
      }
    };
  };

module.exports = validate;
  