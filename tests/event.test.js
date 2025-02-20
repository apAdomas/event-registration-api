require('dotenv').config();
const request = require('supertest');
const app = require('../src/app');
const {Event} = require('../src/models');

describe('Event Endpoints', () => {

    const eventData = {
        name: "Test Conference",
        description: "A test event",
        date: "2025-05-20",
        location: "Test City"
    };

    beforeEach(async () => {
        await Event.destroy({
            where: {
                name: eventData.name,
                date: eventData.date,
                location: eventData.location,
            }
        });
    });

    afterEach(async () => {
        await Event.destroy({
            where: {
                name: eventData.name,
                date: eventData.date,
                location: eventData.location,
            }
        });
    });


    it('should create a new event successfully', async () => {
        const res = await request(app)
            .post('/api/events')
            .send(eventData);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("message", "Event created successfully");
    });


    it('should not allow duplicate events (same name, date, and location)', async () => {
        await request(app).post('/api/events').send(eventData);
        const res = await request(app).post('/api/events').send(eventData);

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message", "Event with same name, date, and location already exists");
    });


    it('should return validation error when required fields are missing', async () => {
        const res = await request(app)
            .post('/api/events')
            .send({
                name: "Incomplete Event",
                location: "Test City"
            });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("error");
    });
});