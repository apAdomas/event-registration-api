const EventService = require('../services/event.service');

exports.createEvent = async (req, res, next) => {
    try {
        const event = await EventService.createEvent(req.body);
        res.status(201).json({
            message: 'Event created successfully'
        });
    } catch (error) {
        next(error);
    }
};

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