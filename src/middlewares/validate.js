/**
 * @fileoverview Middleware for validating request data using a Joi schema.
 */

const Joi = require('joi');

/**
 * Validate request data against a given Joi schema.
 *
 * @param {Object} schema - A Joi schema to validate the request data.
 * @param {string} [property='body'] - The request property to validate (e.g. 'body', 'query', 'params').
 * @returns {Function} Express middleware function.
 */
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