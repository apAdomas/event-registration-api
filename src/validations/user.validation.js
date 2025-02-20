const Joi = require('joi');
const { password, uuid } = require('./custom.validation');

const createUser = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().custom(password, 'password validation')
    }),
};

module.exports = {createUser};