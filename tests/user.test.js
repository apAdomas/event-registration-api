const request = require('supertest');
require('dotenv').config();
const app = require('../src/app');
const {User} = require('../src/models')

describe('User Registration', () => {

    const uniqueEmail = `testuser${Date.now()}@example.com`;
    const validUserData = {
        name: "Test User",
        email: uniqueEmail,
        password: "SecurePass123"
    };


    afterEach(async () => {
        await User.destroy({where: {email: uniqueEmail}});
    });


    it('should register a new user successfully', async () => {
        const res = await request(app)
            .post('/api/user')
            .send(validUserData);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("message", "User registered successfully");
    });


    it('should not allow duplicate email registration', async () => {
        // Register once
        await request(app).post('/api/user').send(validUserData);
        // Try to register again with same email
        const res = await request(app).post('/api/user').send(validUserData);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message", "User with this email already exists");
    });


    it('should return validation error when required fields are missing', async () => {
        const res = await request(app)
            .post('/api/user')
            .send({name: "Incomplete User"});
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("error");
    });


    it('should return validation error for invalid email format', async () => {
        const res = await request(app)
            .post('/api/user')
            .send({
                name: "Invalid Email",
                email: "not-an-email",
                password: "SecurePass123"
            });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toEqual(
            expect.arrayContaining([expect.stringContaining("must be a valid email")])
        );
    });


    it('should return validation error for a short password', async () => {
        const res = await request(app)
            .post('/api/user')
            .send({
                name: "Short Password",
                email: `shortpass${Date.now()}@example.com`,
                password: "123"
            });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toEqual(
            expect.arrayContaining([expect.stringContaining("password must be at least 8 chars")])
        );
    });


    it('should return validation error for password missing letters or numbers', async () => {
        let res = await request(app)
            .post('/api/user')
            .send({
                name: "No Number",
                email: `nonumber${Date.now()}@example.com`,
                password: "PasswordOnly"
            });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toEqual(
            expect.arrayContaining([expect.stringContaining("must contain at least 1 letter and 1 number")])
        );

        res = await request(app)
            .post('/api/user')
            .send({
                name: "No Letter",
                email: `noletter${Date.now()}@example.com`,
                password: "12345678"
            });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toEqual(
            expect.arrayContaining([expect.stringContaining("must contain at least 1 letter and 1 number")])
        );
    });
});