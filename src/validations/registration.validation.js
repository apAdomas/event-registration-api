const Joi = require('joi');

const createRegistration = {
    body: Joi.object({
        user_id: Joi.string().guid({version:['uuidv4']}).required(),
        event_id: Joi.string().guid({version:['uuidv4']}).required(),
    })
};

module.exports = {createRegistration}