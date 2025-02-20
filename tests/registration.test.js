require('dotenv').config();
const request = require('supertest');
const app = require('../src/app');
const {User, Event, Registration} = require('../src/models');

describe('Registration Endpoints', () => {
    let testUser;
    let testEvent;

    const userData = {
        name: "Registration Test User",
        email: `reguser${Date.now()}@example.com`,
        password: "SecurePass123"
    };

    const eventData = {
        name: "Registration Test Event",
        description: "Event for registration testing",
        date: "2025-05-20",
        location: "Test Location"
    };

    beforeAll(async () => {
        // Create test user
        await request(app).post('/api/user').send(userData);
        testUser = await User.findOne({where: {email: userData.email}});

        // Create test event
        await request(app).post('/api/events').send(eventData);
        // Since when creating user, in specs its specified that user details
        // should not be returned and only message, I query user instead
        testEvent = await Event.findOne({
            where: {
                name: eventData.name,
                date: eventData.date,
                location: eventData.location
            }
        });
    });

    afterAll(async () => {
        // remove registrations, user, and event
        await Registration.destroy({where: {}});
        await User.destroy({where: {email: userData.email}});
        await Event.destroy({where: {name: eventData.name}});
    });


    it('should register a user for an event successfully', async () => {
        const res = await request(app)
            .post('/api/registrations')
            .send({
                user_id: testUser.id,
                event_id: testEvent.id
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("message", "Successfully registered for the event");
    });


    it('should not allow duplicate registration for the same user and event', async () => {
        // Register 1
        await request(app).post('/api/registrations').send({
            user_id: testUser.id,
            event_id: testEvent.id
        });
        // Register 2
        const res = await request(app).post('/api/registrations').send({
            user_id: testUser.id,
            event_id: testEvent.id
        });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message", "User already registered for this event");
    });


    it('should return a validation error when required fields are missing', async () => {
        const res = await request(app)
            .post('/api/registrations')
            .send({event_id: testEvent.id});
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("error");
    });
});