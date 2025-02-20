const RegistrationService = require('../services/registration.service');

/**
 * @desc    Register a user for an event
 * @route   POST /api/registrations
 * @access  Public
 * @param   {Object} req - Express request object containing user_id and event_id in the body
 * @param   {Object} res - Express response object
 * @param   {Function} next - Express next function to handle errors
 */
exports.createRegistration = async (req, res, next) => {
    try {
        await RegistrationService.registerUserForEvent(req.body);
        res.status(201).json({
            message: 'Successfully registered for the event',
        });
    } catch (error) {
        next(error);
    }
};