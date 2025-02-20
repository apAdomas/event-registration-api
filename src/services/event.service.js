const {Event} = require('../models')
const {Op} = require('sequelize');

class EventService {
    /**
     * Creates a new event if no event with same {name, date, location} exists
     * @param {Object} eventData - {name, description, date, location}
     * @returns {Promise<Event>} - event created
     * @throws {Error} if duplicate event exists
     */
    static async createEvent(eventData) {
        const duplicateEvent = await Event.findOne({
            where: {
                name: eventData.name,
                date: eventData.date,
                location: eventData.location,
            }
        });

        if (duplicateEvent) {
            const error = new Error("Event with same name, date, and location already exists");
            error.statusCode = 400;
            throw error;
        }
        const event = await Event.create(eventData);
        return event;
    }

    /**
     * Retrieves all events.
     * @returns {Promise<Array<Event>>} list of events
     */
    static async getAllEvents() {
        const today = new Date().toISOString().split('T')[0];
        return await Event.findAll({
            where: {
                date: {
                    [Op.gte]: today
                }
            }
        });
    }
}

module.exports = EventService;