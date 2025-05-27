import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';
import Schedule from '../models/Schedule.js';

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
});

describe('Schedule API', () => {
    it('should create a new schedule', async () => {
        const res = await request(app)
            .post('/api/schedules')
            .send({ dateTime: new Date(Date.now() + 3600000) });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('schedule');
    });

    it('should not allow duplicate dateTime', async () => {
        const dateTime = new Date(Date.now() + 7200000);
        await Schedule.create({ dateTime });
        const res = await request(app)
            .post('/api/schedules')
            .send({ dateTime });
        expect(res.statusCode).toBe(400);
    });

    it('should get all schedules', async () => {
        const res = await request(app).get('/api/schedules');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

afterAll(async () => {
    await Schedule.deleteMany();
    await mongoose.connection.close();
});