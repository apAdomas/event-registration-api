const EventService = require('../services/event.service');

/**
 * @desc    Create a new event
 * @route   POST /api/events
 * @access  Public
 * @param   {Object} req - Express request object containing event details in the body
 * @param   {Object} res - Express response object
 * @param   {Function} next - Express next function to handle errors
 */
exports.createEvent = async (req, res, next) => {
    try {
        await EventService.createEvent(req.body);
        res.status(201).json({
            message: 'Event created successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all upcoming events (date >= CURRENT_DATE)
 * @route   GET /api/events
 * @access  Public
 * @param   {Object} req - Express request object
 * @param   {Object} res - Express response object containing an array of event objects
 * @param   {Function} next - Express next function to handle errors
 */
exports.getEvents = async (req, res, next) => {
    try {
        const events = await EventService.getAllEvents();

        const requiredFields = events.map(({id, name, description, date, location}) => ({
            id, name, description, date, location
        }));
        res.status(200).json(requiredFields);
    } catch (error) {
        next(error);
    }
};