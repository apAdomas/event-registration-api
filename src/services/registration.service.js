const {Registration} = require('../models');


class RegistrationService {
    /**
     * Register user for event
     * Constraint: user must not be registered for the same event
     * @param {Object} params - user_id and event_id
     * @returns {Promise<Registration>} created registration
     * @throws {Error} If user is already registered for particular event
     */
    static async registerUserForEvent({user_id, event_id}) {

        const existingRegistration = await Registration.findOne({
            where: {user_id: user_id, event_id: event_id},
        });
        if (existingRegistration) {
            const error = new Error("User already registered for this event");
            error.statusCode = 400;
            throw error;
        }

        const registration = await Registration.create({user_id, event_id});
        return registration;
    }
}

module.exports = RegistrationService;