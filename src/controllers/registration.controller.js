const RegistrationService = require('../services/registration.service');

exports.createRegistration = async (req, res, next) => {
    try {
        const registration = await RegistrationService.registerUserForEvent(req.body);
        res.status(201).json({
            message: 'Successfully registered for the event',
        });
    } catch (error) {
        next(error);
    }
};