const Joi = require('joi');

const createEvent = {
    body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        date: Joi.date().iso().required(),
        location: Joi.string().required()
    })
};

module.exports = {createEvent}
