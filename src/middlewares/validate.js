const Joi = require('joi');

const validate = (schema, property = 'body') => {
    return (req, res, next) => {
        const {error, value} = schema.validate(req[property], {abortEarly: false});
        if (error) {
            return res.status(400).json({error: error.details.map((detail) => detail.message)});
        }
        req[property] = value
        next();
    };
};

module.exports = validate;