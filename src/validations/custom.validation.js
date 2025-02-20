const uuid = (value, helpers) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
        return helpers.message('"{{#label}}" myst be valid UUID');
    }
    return value;
};

/**
 * Validates a password ensuring it has a minimum length of 8 characters and contains at least
 * one letter and one number.
 *
 * @param {string} value - The password string to validate.
 * @param {Object} helpers - Joi helpers object used to generate custom error messages.
 * @returns {string} The validated password if it meets all criteria.
 */
const password = (value, helpers) => {
    if (value.length < 8) {
        return helpers.message('password must be at least 8 chars');
    }
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        return helpers.message('password must contain at least 1 letter and 1 number');
    }
    return value;
};

module.exports = {
    uuid,
    password,
};