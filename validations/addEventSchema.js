const addEventSchema = Joi.object({
    eventName: Joi.string()
        .min(1)
        .required(),
    eventDescription: Joi.string()
        .min(1)
        .required(),
    clubName: Joi.string()
        .required(),
    dateTime: Joi.date()
        .iso() 
        .required(),
});

module.exports = addEventSchema;
